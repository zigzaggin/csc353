var rtv = {};

var payCalculator = {
    'hourly': function (employee) {
        var collect = 0;
        for (var key in employee.hours) {
            if (employee.hours.hasOwnProperty(key))
                collect += employee.hours[key];
        }

        return employee.pay.rate * collect;
    },
    'salary': function (employee) {
        return employee.pay.rate / 52;
    }
};

var Line = function (desc, calculator) {
    return {
        describe: desc,
        apply: calculator.apply,
        newPay: calculator.newPay
    }
};

var lineCalculators = [
    new Line("Gross Pay", require("./calculators/PassthroughPayCalculator")),
    new Line("Taxes Withheld", require("./calculators/TaxCalculator")),
    new Line("Take Home Pay", require("./calculators/PassthroughPayCalculator"))
];

rtv.run = function (employees, finished) {
    var result = [];

    employees.forEach(function (employee) {
        var employeeType = employee.pay.type;
        var pay = payCalculator[employeeType](employee);
        var lines = [];
        lineCalculators.forEach(function (lineCalculator) {
            var result = lineCalculator.apply(employee, pay);
            pay = lineCalculator.newPay(employee, pay);
            lines.push({key: lineCalculator.describe, value: result});
        });
        result.push({
            name: employee.name.print(),
            lines: lines
        });
    });

    finished(result);
};

module.exports = rtv;