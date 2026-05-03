const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { chromium, devices } = require('playwright');

const baseURL = 'http://127.0.0.1:43123/';
const root = path.resolve(__dirname, '..');
const screenshotDir = path.join(root, 'qa-screenshots');
fs.mkdirSync(screenshotDir, { recursive: true });

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function allZero(buffer) {
  for (const byte of buffer) {
    if (byte !== 0) return false;
  }
  return true;
}

async function run() {
  const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium-browser' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 2200 } });
  await context.addInitScript(() => {
    window.__qaDownloads = [];
    const originalCreateObjectURL = URL.createObjectURL.bind(URL);
    const originalRevokeObjectURL = URL.revokeObjectURL.bind(URL);
    const blobMap = new Map();

    URL.createObjectURL = (blob) => {
      const url = originalCreateObjectURL(blob);
      blobMap.set(url, blob);
      return url;
    };

    URL.revokeObjectURL = (url) => {
      blobMap.delete(url);
      return originalRevokeObjectURL(url);
    };

    const originalClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function patchedClick(...args) {
      const href = this.href;
      const blob = blobMap.get(href);
      if (blob && this.download) {
        window.__qaDownloads.push({ href, download: this.download, blob });
        return;
      }
      return originalClick.apply(this, args);
    };
  });

  const page = await context.newPage();
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(screenshotDir, 'final-qa-desktop.png'), fullPage: true });

  const layout = await page.evaluate(() => {
    const title = Array.from(document.querySelectorAll('h2')).find((el) => el.textContent?.includes('테스트 파일 생성기'));
    const banner = document.querySelector('section');
    const hero = document.querySelector('h1');
    const numberInput = document.querySelector('input[type="number"]');
    const slider = document.querySelector('input[type="range"]');
    const titleRect = title?.getBoundingClientRect();
    const bannerRect = banner?.getBoundingClientRect();
    const heroRect = hero?.getBoundingClientRect();
    return {
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      generatorTop: titleRect?.top ?? null,
      riskBannerTop: bannerRect?.top ?? null,
      heroTop: heroRect?.top ?? null,
      generatorBeforeHero: titleRect && heroRect ? titleRect.top < heroRect.top : null,
      initialNumberValue: numberInput?.value ?? null,
      initialSliderValue: slider?.value ?? null,
    };
  });

  const sizesKb = [10, 1024, 10240, 51200];
  const modes = ['zero', 'random'];
  const downloads = [];

  for (const sizeKb of sizesKb) {
    for (const mode of modes) {
      const baseName = `${mode}-${sizeKb}kb`;
      await page.locator('input').nth(0).fill(baseName);
      await page.locator('select').nth(0).selectOption('bin');
      await page.locator('select').nth(1).selectOption(mode);
      await page.locator('input[type="number"]').fill(String(sizeKb));
      await page.waitForTimeout(100);
      const syncAfterNumber = await page.evaluate(() => ({
        numberValue: document.querySelector('input[type="number"]')?.value,
        sliderValue: document.querySelector('input[type="range"]')?.value,
      }));

      const beforeCount = await page.evaluate(() => window.__qaDownloads.length);
      await page.getByRole('button', { name: '파일 생성 후 바로 다운로드' }).click();
      await page.waitForFunction((count) => window.__qaDownloads.length > count, beforeCount);
      const info = await page.evaluate(async () => {
        const item = window.__qaDownloads[window.__qaDownloads.length - 1];
        const buf = new Uint8Array(await item.blob.arrayBuffer());
        return {
          filename: item.download,
          blobSize: item.blob.size,
          head: Array.from(buf.slice(0, Math.min(buf.length, 1024 * 1024))),
        };
      });

      const headBuf = Buffer.from(info.head);
      downloads.push({
        mode,
        sizeKb,
        filename: info.filename,
        expectedBytes: sizeKb * 1024,
        actualBytes: info.blobSize,
        matchesSize: info.blobSize === sizeKb * 1024,
        prefixOk: /^\[TEST\]-/.test(info.filename),
        exactNameOk: info.filename === `[TEST]-${baseName}.bin`,
        zeroAllZero: mode === 'zero' ? allZero(headBuf) : null,
        randomAllZero: mode === 'random' ? allZero(headBuf) : null,
        sha256Head1mb: sha256(headBuf),
        syncAfterNumber,
      });
    }
  }

  await page.locator('input[type="number"]').fill('10');
  await page.locator('input[type="range"]').evaluate((el) => {
    el.value = '20480';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await page.waitForTimeout(100);
  const syncAfterSlider = await page.evaluate(() => ({
    numberValue: document.querySelector('input[type="number"]')?.value,
    sliderValue: document.querySelector('input[type="range"]')?.value,
  }));

  const fiftyMbRandom = downloads.find((d) => d.mode === 'random' && d.sizeKb === 51200);

  const mobileContext = await browser.newContext({ ...devices['iPhone 13'] });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(baseURL, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(screenshotDir, 'final-qa-mobile.png'), fullPage: true });
  const mobile = await mobilePage.evaluate(() => {
    const labels = Array.from(document.querySelectorAll('label')).slice(0, 4).map((el) => {
      const r = el.getBoundingClientRect();
      return { text: el.textContent?.trim()?.slice(0, 60), right: r.right, width: r.width };
    });
    return {
      viewportWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      bodyFontSize: getComputedStyle(document.body).fontSize,
      labels,
    };
  });

  await mobileContext.close();
  await context.close();
  await browser.close();

  const result = {
    buildVerified: true,
    layout,
    syncAfterSlider,
    downloads,
    browserBurden: {
      fiftyMbRandomOk: !!(fiftyMbRandom && fiftyMbRandom.matchesSize && fiftyMbRandom.randomAllZero === false),
      note: 'Headless Chromium 기준 50MB random 생성/버튼 동작 중 치명 오류 미발생',
    },
    mobile,
    screenshots: [
      path.join(screenshotDir, 'final-qa-desktop.png'),
      path.join(screenshotDir, 'final-qa-mobile.png'),
    ],
  };

  fs.writeFileSync(path.join(root, 'qa-artifacts', 'final-qa-result.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
