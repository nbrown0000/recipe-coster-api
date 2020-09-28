// check is measurement i.e. quantity with unit (eg. 200g)
function isMeasurement(component) {
  if(component.match('^[0-9]+[a-z]+$') !== null) return true;
  else return false;
}

// check is quantity (e.g. 2) --- note unit to follow
function isQuantity(component) {
  if(component.match('^[0-9]+$') !== null) return true;
  else if(component.match('^[0-9]+\/[0-9]+$') !== null) return true;
  else return false;
}

// check is unit (e.g. tablespoon)
function isUnit(component) {
  const units = [
    'tablespoon', 'tablespoons',
    'teaspoon', 'teaspoons',
    'cup', 'cups',
    'pinch', 'dash',
    'pkt'
  ]
  if(units.includes(component)) return true;
  else return false;
}

function isProduct(component) {

}

function isPreparation(component) {

}

function isParenthesized(component) {
  
}


function parseIngredient(ingredient) {

  const components = ingredient.split(" ");
  // console.log(components)
  let quantity = "";
  let unit = "";
  let product = "";
  let preparation = "";

  for(let i=0; i<components.length; i++) {

    // if is a measurement
    if(isMeasurement(components[i])) {
      quantity = quantity + components[i].match('[0-9]+');
      unit = unit + components[i].match('[a-z]+');
    }
    else if(isQuantity(components[i])) {
      quantity = quantity + components[i];
    }
  }

  console.log(quantity, unit, product)
}




parseIngredient('20g unsalted butter');

module.exports = {
  isMeasurement,
  isQuantity,
  isUnit,
  parseIngredient
};