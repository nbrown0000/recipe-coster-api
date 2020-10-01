const puppeteer = require('puppeteer');
const $ = require('cheerio');


async function scrapeUrl(url) {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  const html = await page.content();

  var ingredients = [];
  await $('.ingredient-description', html).each(function() {
    ingredients.push($(this).text().trim())
  })

  // await browser.close();
  return ingredients;
}

module.exports = {
  scrapeUrl
}