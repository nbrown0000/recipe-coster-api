const express = require("express");
const puppeteer = require('puppeteer');
const $ = require('cheerio');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
app.use(bodyParser.json())
app.use(cors());


const url = 'https://www.taste.com.au/recipes/'
      + 'french-style-chicken-potatoes/'
      + '21c92bf7-4876-49eb-aff3-728ce7273eea?r=dinner&h=Dinner';



app.post("/", (req,res) => {

  (async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});
    const html = await page.content();

    var ingredients = [];
    await $('.ingredient-description', html).each(function() {
      ingredients.push($(this).text().trim())
    })
    res.send(ingredients)


    await browser.close()

  })()

})




const PORT = process.env.PORT || 3100
app.listen(PORT, () => {
  console.log(`Recipe-Coster-API listening on port ${PORT}`);
})