import puppeteer from 'puppeteer';
// import fs from 'fs/promises';

const button = document.getElementById('button');
const searchTerm = document.getElementById('input');

async function scrape(input) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.merriam-webster.com/');

  await page.type('#s-term', `${input}`);
  await Promise.all([page.click('#mw-search-frm > div.s-term-cnt.border-box > div.nav-search-btn.desk-search-btn'), page.waitForNavigation()]);

  const info = await page.$eval('#left-content > div.row.entry-header > div:nth-child(1) > h1', el => el.textContent);
  console.log(info);


  await browser.close();
}

button.addEventListener('click', () => {
  const word = searchTerm.value;
  scrape(word);

});

