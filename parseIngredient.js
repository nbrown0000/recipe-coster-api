// check is measurement i.e. quantity with unit (eg. 200g)
function isMeasurement(component) {
  if(typeof(component) !== "string") return false;
  else if(component.match('^[0-9]+[a-z]+$') !== null) return true;
  else return false;
}

// check is quantity (e.g. 2) --- note unit to follow
function isQuantity(component) {
  if(typeof(component) !== "string") return false;
  else if(component.match('^[0-9]+$') !== null) return true;
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
  if(typeof(component) !== "string") return false;
  else if(units.includes(component)) return true;
  else return false;
}

function isBeforePreparation(component) {
  if(typeof(component) !== "string") return false;
  else if(component.match('(\(\)|[a-z])+\,$')) return true;
  else return false;
}

function isParenthesized(component) {
  if(typeof(component) !== "string") return false;
  else if(component.match(/\(([^()]+)\)/g) !== null) return true;
  else return false;
}


function parseIngredient(ingredient) {

  const components = ingredient.split(" ");
  // console.log(components)
  let quantity = "";
  let unit = "";
  let product = "";
  let preparation = "";
  let parenthesized = "";
  
  let preparationFound = false;

  for(let i=0; i<components.length; i++) {

    if(isBeforePreparation(components[i-1])) {
      preparationFound = true;
    }
    if(preparationFound) {
      preparation = preparation + components[i] + " ";
    }
    // if component[i] is a measurement
    else if(isMeasurement(components[i])) {
      quantity = quantity + components[i].match('[0-9]+');
      unit = unit + components[i].match('[a-z]+');
    }
    // if component[i] is a quantity
    else if(isQuantity(components[i])) {
      quantity = quantity + components[i];
    }
    // if component[i] is a unit
    else if(isUnit(components[i])) {
      unit = unit + components[i];
    }
    // if component[i] is a note (parenthesized)
    else if(isParenthesized(components[i])) {
      if(components[i].match('[\(][a-z]+[\)]\,$')) {
        parenthesized = parenthesized + components[i].slice(0,-1);
      }
      else {
        parenthesized = parenthesized + components[i];
      }
    }
    // if component[i] is a product (or part of product)
    else {
      if(isBeforePreparation(components[i])) {
        product = product + components[i].slice(0,-1) + " ";
      }
      else {
        product = product + components[i] + " ";
      }
    }

  }

  return {
    quantity: quantity.trim(),
    unit: unit.trim(),
    product: product.trim(),
    preparation: preparation.trim(),
    parenthesized: parenthesized.trim()
  }
}

module.exports = {
  isMeasurement,
  isQuantity,
  isUnit,
  isParenthesized,
  parseIngredient,
  isBeforePreparation,
  parseIngredient
};