"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    if (!initNum) {
      res.send("Invalid Number!");
    }

    const initUnit = convertHandler.getUnit(input);
    if (!initUnit) {
      res.send("Invalid Unit!");
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    res.json(toString);
  });
};
