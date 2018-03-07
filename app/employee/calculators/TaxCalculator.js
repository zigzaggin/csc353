var base = require("./base-calculator");

var obj = base();

obj.apply = function (employee, pay) {
    return pay * .25;
};

module.exports = obj;