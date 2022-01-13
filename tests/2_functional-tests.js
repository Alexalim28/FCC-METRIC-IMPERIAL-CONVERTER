const chai = require("chai");
const chaiHttp = require("chai-http");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests", function () {
    suite("GET /api/convert with a valid input", function () {
      test("Convert 10L", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "10L" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, "L");
            assert.approximately(res.body.returnNum, 2.64172, 0.1);
            assert.equal(res.body.returnUnit, "gal");
            assert.equal(
              res.body.string,
              "10 liters converts to 2.64172 gallons"
            );
          });
        done();
      });
      test("Convert 32g", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "32g" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initUnit, undefined);
          });
        done();
      });
      test("Convert 3/7.2/4kg", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kg" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, undefined);
          });
        done();
      });
      test("Convert 3/7.2/4kilomegagram", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kilomegagram" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, undefined);
            assert.equal(res.body.initUnit, undefined);
          });
        done();
      });
      test("Covert kg with no number", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "kg" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, "kg");
            assert.approximately(res.body.returnNum, 2.20462, 0.1);
            assert.equal(res.body.returnUnit, "lbs");
            assert.equal(
              res.body.string,
              "1 kilograms converts to 2.20462 pounds"
            );
          });
        done();
      });
    });
  });
});
