import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import cron from 'node-cron';

async function scrape() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://learnwebcode.github.io/practice-requests/');
  // await page.screenshot({ path: 'examplescrape.png' });
  //{path: 'example', fullPage: true} will capture entire page
  // const names = ['red', 'orange', 'green'];
  const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.info strong')).map(n => n.textContent);
  });
  await fs.writeFile('names.txt', names.join('\r\n'));
  //within chrome dev tools, right click an element and select (HTML selector) to get a css operator of that element
  
  await page.click('#clickme');
  //.click takes in a css selector
  const clickedData = await page.$eval('#data', el => el.textContent);
  console.log(clickedData);
  //$eval takes 2 parameters (css selector, argument)


  const photos = await page.$$eval('img', (images) => {
  //eval takes two arguments: (css selector, function)
    return images.map(n => n.src);
  });
  
  await page.type('#ourfield', 'blue');
  //type takes in (css selector, input value)

  await Promise.all([page.click('#ourform button'), page.waitForNavigation()])

  const info = await page.$eval('#message', el => el.textContent);
  console.log(info);

  for(const photo of photos) {
    const imagepage = await page.goto(photo);
    await fs.writeFile(photo.split('/').pop(), await imagepage.buffer());
    //writeFile takes 2 arguments, (filepath, contents)
  }

  await browser.close();
}

//set scraper to run at specific interval
// setInterval(scrape(), 5000);
//cron sets specific real time (i.e. month, hour, day)
//cron.schedule('*/5 *****', start)
//check out chron tab linux 
scrape();
//to run locally, use node filename
