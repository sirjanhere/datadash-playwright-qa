const { chromium } = require('playwright');

async function scrapeAndSum() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const urls = [
    "https://sanand0.github.io/tdsdata/js_table/?seed=68",
    "https://sanand0.github.io/tdsdata/js_table/?seed=69",
    "https://sanand0.github.io/tdsdata/js_table/?seed=70",
    "https://sanand0.github.io/tdsdata/js_table/?seed=71",
    "https://sanand0.github.io/tdsdata/js_table/?seed=72",
    "https://sanand0.github.io/tdsdata/js_table/?seed=73",
    "https://sanand0.github.io/tdsdata/js_table/?seed=74",
    "https://sanand0.github.io/tdsdata/js_table/?seed=75",
    "https://sanand0.github.io/tdsdata/js_table/?seed=76",
    "https://sanand0.github.io/tdsdata/js_table/?seed=77",
  ];

  let total = 0;

  for (const url of urls) {
    await page.goto(url);
    const numbers = await page.$$eval("table td, table th", cells =>
      cells.map(c => parseFloat(c.innerText.replace(/,/g, ''))).filter(x => !isNaN(x))
    );
    const sum = numbers.reduce((a, b) => a + b, 0);
    total += sum;
  }

  console.log("Total Sum:", total);
  await browser.close();
}

scrapeAndSum();
