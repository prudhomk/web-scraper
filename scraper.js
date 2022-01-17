import puppeteer from 'puppeteer';
import fs from 'fs/promises';
// import cron from 'node-cron';

async function scrape() {
  //setup puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //declare the site you want to scrape
  await page.goto('https://www.merriam-webster.com/');
  await page.screenshot({ path: 'examplescrape.png', fullPage: true });
  //{path: 'example', fullPage: true} will capture entire page

  //evaluate the page for the content you want
  const definition = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#dictionary-entry-1 > div.vg > div:nth-child(1) > span > div > span.dt.hasSdSense > span')).map(n => n.textContent);
  });
  await fs.writeFile('scrapedText.txt', definition.join('\r\n'));
  //within chrome dev tools, right click an element and select (HTML selector) to get a css operator of that element
  
  await page.type('#s-term', 'apple');
  //type takes in (css selector, input value)

  await Promise.all([page.click('#mw-search-frm > div.s-term-cnt.border-box > div.nav-search-btn.desk-search-btn'), page.waitForNavigation()]);

  const info = await page.$eval('#left-content > div.row.entry-header > div:nth-child(1) > h1', el => el.textContent);
  console.log(info);


  await browser.close();
}

scrape();
//to run locally, use node filename

//page.waitForFunction() or page.waitForNavigation() could be useful for scraping
//How to make this dynamic: user input for site url, have a dictionary/regex list of common tags to attempt for text and or images
//see if temperate literals or even a .env file can be accepted into a puppeteer system
