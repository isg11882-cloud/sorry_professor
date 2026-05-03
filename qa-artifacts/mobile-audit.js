const { chromium, devices } = require('playwright');
(async() => {
  const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium-browser' });
  const context = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3001', { waitUntil: 'networkidle' });
  const data = await page.evaluate(() => {
    const getBoxByText = (text) => {
      const el = Array.from(document.querySelectorAll('body *')).find((node) => node.textContent?.trim() === text);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom };
    };
    const buttons = Array.from(document.querySelectorAll('button')).map((el) => {
      const r = el.getBoundingClientRect();
      return { text: el.textContent?.trim(), x: r.x, y: r.y, width: r.width, height: r.height, right: r.right };
    });
    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      heroTitle: getBoxByText('교수님 확인 부탁드립니다'),
      riskBannerTitle: getBoxByText('제출용 아님 · 테스트/패러디 전용'),
      riskBadge: getBoxByText('실제 제출 금지'),
      fileCheckTitle: getBoxByText('내 파일 바로 점검하기'),
      sampleTitle: getBoxByText('시연용 샘플 파일 받기'),
      buttons,
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
