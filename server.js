const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const { scrapeUrl } = require('./scrapeUrl');
const { parseIngredient } = require('./parseIngredient');

const app = express();
app.use(bodyParser.json())
app.use(cors());


const url = "https://www.taste.com.au/recipes/french-style-chicken-potatoes/21c92bf7-4876-49eb-aff3-728ce7273eea?r=dinner&h=Dinner";



app.post("/", async(req,res) => {
  const ingredients = await scrapeUrl(req.body.url)
  const parsedIngredients = await ingredients.map(ingredient => {
    return parseIngredient(ingredient)
  })

  res.send(parsedIngredients)

})




const PORT = process.env.PORT || 3100
app.listen(PORT, () => {
  console.log(`Recipe-Coster-API listening on port ${PORT}`);
})