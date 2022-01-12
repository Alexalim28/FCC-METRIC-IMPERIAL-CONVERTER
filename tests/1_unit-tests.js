const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Tests related to numeric values", function () {
    test("Should correctly read a whole number input", function () {
      let result = convertHandler.getNum("2km");
      assert.isOk(Number.isInteger(result));
    });
    test("Should correctly read a decimal number input", function () {
      let result = convertHandler.getNum("1.5km");
      assert.isNotOk(Number.isInteger(result));
    });
    test("should correctly read a fractional input with a decimal", function () {
      let result = convertHandler.getNum("1/5km");
      assert.isNotOk(Number.isInteger(result));
    });
    test("Should correctly return an error on a double-fraction", function () {
      let result = convertHandler.getNum("3/2/3km");
      assert.isNotTrue(result);
    });
    test("Should correctly default to a numerical input of 1 when no numerical input is provided", function () {
      let result = convertHandler.getNum("km");
      assert.equal(result, 1);
    });
  });

  suite("Tests related to units", function () {
    test("Should correctly read each valid input unit", function () {
      let result = convertHandler.getUnit("2km");
      assert.equal(result, "km");
    });
    test("Should correctly read each valid input unit", function () {
      let result = convertHandler.getUnit("2km");
      assert.isNotTrue(result, "km");
    });
    test("Should correctly return an error for an invalid input unit", function () {
      let result = convertHandler.getUnit("2us");
      assert.isNotTrue(result);
    });
    test("Should return the correct return unit for each valid input unit", function () {
      let result = convertHandler.getReturnUnit("km");
      assert.equal(result, "mi");
    });
    test("Should correctly return the spelled-out string unit for each valid input unit", function () {
      let result = convertHandler.spellOutUnit("mi");
      assert.equal(result, "miles");
    });

    suite("Tests related to conversion", function () {
      test("Should correctly convert gal to L", function () {
        let result = convertHandler.convert(1, "gal");
        assert.equal(result, 3.78541);
      });
      test("Should correctly convert L to gal", function () {
        let result = convertHandler.convert(1, "l");
        assert.equal(result, 0.26417);
      });
      test("Should correctly convert mi to km", function () {
        let result = convertHandler.convert(1, "mi");
        assert.equal(result, 1.60934);
      });
      test("Should correctly convert km to mi", function () {
        let result = convertHandler.convert(1, "km");
        assert.equal(result, 0.62137);
      });
      test("Should correctly convert lbs to kg", function () {
        let result = convertHandler.convert(1, "lbs");
        assert.equal(result, 0.45359);
      });
      test("Should correctly convert kg to lbs", function () {
        let result = convertHandler.convert(1, "kg");
        assert.equal(result, 2.20462);
      });
    });
  });
});
