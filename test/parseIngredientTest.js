const assert = require('assert');

const {
  isMeasurement,
  isQuantity,
  isUnit
} = require('../parseIngredient');


const parseIngredient = require('../parseIngredient');

// const { isAQuantity } = ingredientParser;

describe("parseIngredient", function() {


  describe("isMeasurement", function() {
    it("should return true for '200g'", function() {
      const measurement1 = "200g";
      assert.strictEqual(isMeasurement(measurement1), true)
    })
    it("should return true for '20ml'", function() {
      const measurement2 = "20ml";
      assert.strictEqual(isMeasurement(measurement2), true)
    })
    it("should return true for '1kg'", function() {
      const measurement3 = "1kg";
      assert.strictEqual(isMeasurement(measurement3), true)
    })
    it("should return false for 'pinch'", function() {
      const measurement4 = "pinch";
      assert.strictEqual(isMeasurement(measurement4), false)
    })
  });


  describe("isQuantity", function() {
    it("should return true for '1'", function() {
      const quantity1 = "1";
      assert.strictEqual(isQuantity(quantity1), true)
    })
    it("should return true for '200'", function() {
      const quantity2 = "200";
      assert.strictEqual(isQuantity(quantity2), true)
    })
    it("should return true for '1/2'", function() {
      const quantity3 = "1/2";
      assert.strictEqual(isQuantity(quantity3), true)
    })
    it("should return false for '200g'", function() {
      const quantity4 = "200g";
      assert.strictEqual(isQuantity(quantity4), false)
    })
    it("should return false for 'tablespoon'", function() {
      const quantity5 = "tablespoon";
      assert.strictEqual(isQuantity(quantity5), false)
    })
  });


  describe("isUnit", function() {
    it("should return true for 'tablespoon'", function() {
      const unit1 = "tablespoon";
      assert.strictEqual(isUnit(unit1), true)
    })
    it("should return true for 'cups'", function() {
      const unit2 = "cups";
      assert.strictEqual(isUnit(unit2), true)
    })
    it("should return false for 'chopped'", function() {
      const unit3 = "chopped";
      assert.strictEqual(isUnit(unit3), false)
    })
  });

})