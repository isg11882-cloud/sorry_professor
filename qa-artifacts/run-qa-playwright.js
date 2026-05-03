const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');

(async() => {
  const baseURL = 'http://127.0.0.1:3001';
  const screenshotDir = path.resolve('qa-screenshots');
  const downloadDir = path.resolve('qa-artifacts/downloads');
  fs.mkdirSync(screenshotDir, { recursive: true });
  fs.mkdirSync(downloadDir, { recursive: true });

  const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium-browser', downloadsPath: downloadDir });
  const context = await browser.newContext({ acceptDownloads: true, viewport: { width: 1440, height: 1800 } });
  const page = await context.newPage();

  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(screenshotDir, '01-landing-desktop.png'), fullPage: true });

  const pageText = await page.textContent('body');
  const checks = {
    landingHasMainCopy: pageText.includes('내 파일 바로 점검하기') && pageText.includes('시연용 샘플 파일 받기'),
    bannerHasApprovedCopy: pageText.includes('제출용 아님 · 테스트/패러디 전용') && pageText.includes('교육·시연·패러디 목적에서만 사용하세요.'),
    labelGuideMatches: pageText.includes('[TEST][PARODY] 접두사 / 데모용 / 제출 금지'),
  };

  await page.setInputFiles('input[type="file"]', path.resolve('qa-artifacts/upload-sample.txt'));
  await page.getByRole('button', { name: '내 파일 바로 점검하기' }).click();
  await page.getByText('점검 결과: 기본 확인 완료').waitFor({ timeout: 5000 });
  await page.screenshot({ path: path.join(screenshotDir, '02-file-check-result.png'), fullPage: true });

  await page.getByLabel('샘플 주제').fill('중간발표 초안');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: '시연용 샘플 파일 받기' }).click();
  const download = await downloadPromise;
  const suggestedFilename = download.suggestedFilename();
  const savedPath = path.join(downloadDir, suggestedFilename);
  await download.path();
  await download.saveAs(savedPath);
  await page.getByText('최근 다운로드').waitFor({ timeout: 5000 });
  await page.screenshot({ path: path.join(screenshotDir, '03-sample-download.png'), fullPage: true });

  const downloadedContent = fs.readFileSync(savedPath, 'utf8');

  const mobileContext = await browser.newContext({ ...devices['iPhone 13'], acceptDownloads: false });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(baseURL, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(screenshotDir, '04-landing-mobile.png'), fullPage: true });

  const mobileMetrics = await mobilePage.evaluate(() => {
    const badge = Array.from(document.querySelectorAll('*')).find(el => el.textContent?.includes('제출용 아님 · 테스트/패러디 전용'));
    const hero = document.querySelector('h1');
    return {
      innerWidth: window.innerWidth,
      badgeHeight: badge ? badge.getBoundingClientRect().height : null,
      heroHeight: hero ? hero.getBoundingClientRect().height : null,
      bodyScrollWidth: document.body.scrollWidth,
      viewportWidth: window.innerWidth,
    };
  });

  await mobileContext.close();
  await context.close();
  await browser.close();

  const result = {
    checks,
    suggestedFilename,
    savedPath,
    downloadedContentPreview: downloadedContent.split('\n').slice(0, 6),
    mobileMetrics,
  };

  fs.writeFileSync(path.resolve('qa-artifacts/qa-result.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
