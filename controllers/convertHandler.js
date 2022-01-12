function ConvertHandler() {
  this.getNum = function (input) {
    let result;

    const operators = {
      "/": (a, b) => a / b,
    };

    const regex = /^(\d*\.?\d*(?:\/\d*\.?\d*)?)([a-z]*)$/im; // (?=[^\d\r\n]*\d)

    if (!regex.test(input)) {
      return false;
    }

    const num = input.match(regex)[1];

    if (!num) {
      result = 1;
    } else {
      if (num.includes("/")) {
        const nums = num.split("/");
        const op1 = parseFloat(nums[0]);
        const op2 = parseFloat(nums[1]);

        result = operators["/"](op1, op2);
      } else {
        result = parseFloat(num);
      }
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;

    const acceptedUnits = ["mi", "km", "lbs", "kg", "gal", "", "l"];

    const regex = /^(\d*\.?\d*(?:\/\d*\.?\d*)?)([a-z]*)$/im; // (?=[^\d\r\n]*\d)

    const unit = input.match(regex)[2] || input.match(regex)[1];

    if (!acceptedUnits.includes(unit)) {
      result = false;
    } else {
      result = unit;
    }

    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    switch (initUnit) {
      case "km":
        result = "mi";
        break;
      case "mi":
        result = "km";
        break;
      case "kg":
        result = "lbs";
        break;
      case "lbs":
        result = "kg";
        break;
      case "l":
        result = "gal";
        break;
      case "gal":
        result = "l";
        break;
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

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
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
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
