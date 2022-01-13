const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function getNum()", function () {
    test("Should correctly read a whole number input", function (done) {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    test("Should correctly read a decimal number input", function (done) {
      let input = "32.2L";
      assert.equal(convertHandler.getNum(input), 32.2);
      done();
    });
    test("should correctly read a fractional input", function (done) {
      let input = "1/32L";
      assert.equal(convertHandler.getNum(input), 1 / 32);
      done();
    });
    test("Should correctly read a fractional input with a decimal", function (done) {
      let input = "1.2/32L";
      assert.equal(convertHandler.getNum(input), 1.2 / 32);
      done();
    });
    test("Should correctly return an error on a double-fraction", function (done) {
      let input = "1/2/32L";
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });
    test("Should correctly default to a numerical input of 1 when no numerical input is provided", function (done) {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function getUnit()", function () {
    test("Should correctly read each valid input unit", function (done) {
      const inputs = [
        "km",
        "mi",
        "kg",
        "lbs",
        "gal",
        "l",
        "KM",
        "MI",
        "KG",
        "LBS",
        "GAL",
        "L",
      ];
      const output = [
        "km",
        "mi",
        "kg",
        "lbs",
        "gal",
        "L",
        "km",
        "mi",
        "kg",
        "lbs",
        "gal",
        "L",
      ];
      inputs.forEach((input, index) => {
        assert.equal(convertHandler.getUnit(input), output[index]);
      });
      done();
    });
    test("Should correctly return an error for an invalid input unit", function (done) {
      assert.equal(convertHandler.getUnit("34kilograms"), undefined);
      done();
    });
  });

  suite("Function getReturnUnit()", function () {
    test("Should return the correct return unit for each valid input unit", function (done) {
      const inputUnits = ["km", "mi", "kg", "lbs", "l", "gal"];
      const expectedUnits = ["mi", "km", "lbs", "kg", "gal", "L"];
      inputUnits.forEach((input, index) => {
        assert.equal(convertHandler.getReturnUnit(input), expectedUnits[index]);
      });
      done();
    });
  });

  suite("Function spellOutUnit()", function () {
    test("Should correctly return the spelled-out string unit for each valid input unit", function (done) {
      const units = ["km", "mi", "kg", "lbs", "gal", "l"];
      const strings = [
        "kilometers",
        "miles",
        "kilograms",
        "pounds",
        "gallons",
        "liters",
      ];
      units.forEach((unit, index) => {
        assert.equal(convertHandler.spellOutUnit(unit), strings[index]);
      });
      done();
    });
  });

  suite("Function convert()", function () {
    test("Should correctly convert gal to L", function (done) {
      let input = [5, "gal"];
      let expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
    test("Should correctly convert L to gal", function (done) {
      let input = [5, "L"];
      let expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
    test("Should correctly convert mi to km", function (done) {
      let input = [5, "mi"];
      let expected = 8.0467;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
    test("Should correctly convert km to mi", function (done) {
      let input = [5, "km"];
      let expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
    test("Should correctly convert lbs to kg", function (done) {
      let input = [5, "lbs"];
      let expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
    test("Should correctly convert kg to lbs", function (done) {
      let input = [5, "kg"];
      let expected = 11.02312;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
  });
});
