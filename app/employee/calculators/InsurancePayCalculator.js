var base = require('./base-calculator');

var obj = base();
var insuranceTypes = {
    "MID": 2
};

obj.apply = function (employee, pay) {
    return insuranceTypes[employee.insurance];
};

module.exports = obj;