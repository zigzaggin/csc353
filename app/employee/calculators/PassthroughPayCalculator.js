var base = require("./base-calculator");

var obj = base();

obj.apply = function (employee, pay) {
    return pay;
};

obj.newPay = function (employee, pay) {
    return pay;
};

module.exports = obj;