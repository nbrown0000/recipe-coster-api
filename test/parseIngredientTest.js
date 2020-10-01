const assert = require('assert');

const {
  isMeasurement,
  isQuantity,
  isUnit,
  isParenthesized,
  isBeforePreparation,
  parseIngredient
} = require('../parseIngredient');




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
    it("should return true for '1.6kg'", function() {
      const measurement5 = "1.6kg";
      assert.strictEqual(isMeasurement(measurement5), true)
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


  describe("isParenthesized", function() {
    it("should return true for '(diced)'", function() {
      const parenthesized1 = "(diced)";
      assert.strictEqual(isParenthesized(parenthesized1), true)
    })
    it("should return true for '(peeled and chopped)'", function() {
      const parenthesized2 = "(peeled and chopped)";
      assert.strictEqual(isParenthesized(parenthesized2), true)
    })
    it("should return false for 'mince beef'", function() {
      const parenthesized3 = "mince beef";
      assert.strictEqual(isParenthesized(parenthesized3), false)
    })
  });


  describe("isBeforePreparation", function() {
    it("should return true for 'lamb,'", function() {
      const preparation1 = "lamb,";
      assert.strictEqual(isBeforePreparation(preparation1), true)
    })
    it("should return false for 'banana'", function() {
      const preparation2 = "banana";
      assert.strictEqual(isBeforePreparation(preparation2), false)
    })
  });


  describe("parseIngredient", function() {
    it("should return correct values for '20g unsalted butter'", function() {
      const parse1 = parseIngredient('20g unsalted butter')
      assert.strictEqual(parse1.quantity, '20')
      assert.strictEqual(parse1.unit, 'g')
      assert.strictEqual(parse1.product, 'unsalted butter')
      assert.strictEqual(parse1.preparation, '')
      assert.strictEqual(parse1.parenthesized, '')
    })
    it("should return correct values for '100g Taleggio cheese, finely sliced '", function() {
      const parse2 = parseIngredient('100g Taleggio cheese, finely sliced ')
      assert.strictEqual(parse2.quantity, '100')
      assert.strictEqual(parse2.unit, 'g')
      assert.strictEqual(parse2.product, 'Taleggio cheese')
      assert.strictEqual(parse2.preparation, 'finely sliced')
      assert.strictEqual(parse2.parenthesized, '')
    })
    it("should return correct values for '1 small zucchini, thinly sliced'", function() {
      const parse3 = parseIngredient('1 small zucchini, thinly sliced')
      assert.strictEqual(parse3.quantity, '1')
      assert.strictEqual(parse3.unit, '')
      assert.strictEqual(parse3.product, 'small zucchini')
      assert.strictEqual(parse3.preparation, 'thinly sliced')
      assert.strictEqual(parse3.parenthesized, '')
    })
    it("should return correct values for '6 zucchini flowers (optional), or another zucchini '", function() {
      const parse4 = parseIngredient('6 zucchini flowers (optional), or another zucchini ')
      assert.strictEqual(parse4.quantity, '6')
      assert.strictEqual(parse4.unit, '')
      assert.strictEqual(parse4.product, 'zucchini flowers')
      assert.strictEqual(parse4.preparation, 'or another zucchini')
      assert.strictEqual(parse4.parenthesized, '(optional)')
    })
    it("should return correct values for '4 small desiree potatoes, thinly sliced widthwise to 5mm thick '", function() {
      const parse5 = parseIngredient('4 small desiree potatoes, thinly sliced widthwise to 5mm thick ')
      assert.strictEqual(parse5.quantity, '4')
      assert.strictEqual(parse5.unit, '')
      assert.strictEqual(parse5.product, 'small desiree potatoes')
      assert.strictEqual(parse5.preparation, 'thinly sliced widthwise to 5mm thick')
      assert.strictEqual(parse5.parenthesized, '')
    })
    it("should return correct values for '1.6kg Coles RSPCA Approved Australian Whole Chicken'", function() {
      const parse6 = parseIngredient('1.6kg Coles RSPCA Approved Australian Whole Chicken')
      assert.strictEqual(parse6.quantity, '1.6')
      assert.strictEqual(parse6.unit, 'kg')
      assert.strictEqual(parse6.product, 'Coles RSPCA Approved Australian Whole Chicken')
      assert.strictEqual(parse6.preparation, '')
      assert.strictEqual(parse6.parenthesized, '')
    })
    
  });

})