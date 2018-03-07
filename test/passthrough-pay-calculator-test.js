var assert = require('assert');
var calculator = require('../app/employee/calculators/PassthroughPayCalculator');

describe('pass through pay calculator', function () {
    describe('Calculate Pay', function () {
        it("should return the pay provided", function () {
            assert.equal(calculator.apply({}, 5), 5);
        })
    });
    describe('New Pay Rate', function () {
        it("should return the pay provided", function () {
            assert.equal(calculator.newPay({}, 5), 5);
        })
    });
});