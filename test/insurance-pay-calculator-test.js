var assert = require('assert');
var calculator = require('../app/employee/calculators/InsurancePayCalculator');

describe('insurance calculator', function () {
    describe('execute apply', function () {
        it("should return the assigned insurance rate", function () {
            assert.equal(calculator.apply({
                insurance: "MID"
            }, 5), 2);
        })
    });
    describe("new pay", function () {
        it("should remove the insurance from the pay", function () {
            assert.equal(calculator.newPay({insurance: "MID"}, 5), 3)
        })
    })
});