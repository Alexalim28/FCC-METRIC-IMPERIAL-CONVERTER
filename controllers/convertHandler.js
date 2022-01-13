function ConvertHandler() {
  this.isNumValid = function (num) {
    const regex = /^(\d*\.?\d*(?:\/\d*\.?\d*)?)$/im;
    return regex.test(num);
  };

  this.getNum = function (input) {
    let result;

    const index = input.search(/[A-Za-z]/);
    let num = input.slice(0, index) || "1";

    if (!this.isNumValid(num)) {
      return undefined;
    }

    const nums = num.split("/");
    const num1 = parseFloat(nums[0]);
    const num2 = parseFloat(nums[1] || "1");

    result = num1 / num2;

    return result;
  };

  this.getUnit = function (input) {
    const index = input.search(/[A-Za-z]/);
    let unit = input.slice(index).toLowerCase();

    switch (unit) {
      case "km":
      case "mi":
      case "kg":
      case "lbs":
      case "gal":
        return unit;
      case "l":
        return "L";
      default:
        return undefined;
    }
  };

  this.getReturnUnit = function (initUnit) {
    let result = initUnit.toLowerCase();

    switch (result) {
      case "km":
        return "mi";
      case "mi":
        return "km";
      case "kg":
        return "lbs";
      case "lbs":
        return "kg";
      case "l":
        return "gal";
      case "gal":
        return "L";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function (unit) {
    let result;
    unit = unit.toLowerCase();

    switch (unit) {
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "gal":
        result = "gallons";
        break;
      case "l":
        result = "liters";
        break;
      default:
        return "Not a valid unit";
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    initUnit = initUnit.toLowerCase();
    let result;

    const calc = {
      mi: (initNum) => initNum * miToKm,
      km: (initNum) => initNum / miToKm,
      lbs: (initNum) => initNum * lbsToKg,
      kg: (initNum) => initNum / lbsToKg,
      gal: (initNum) => initNum * galToL,
      l: (initNum) => initNum / galToL,
    };

    result = calc[initUnit](initNum);
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    string = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    };
  };
}

module.exports = ConvertHandler;
