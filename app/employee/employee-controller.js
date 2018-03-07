var Employee = require('./models/Employee');

var employees = [];
var id = 0;

function generateId() {
    return ++id;
}

module.exports = {
    load: function (cb) {
        Employee.find(function (err, emps) {
            cb(emps);
        });
    },
    findById: function (id, cb) {
        Employee.find({id: id}, function (err, emp) {
            cb(emp);
        });
    },
    add: function (source, finished) {
        var toSave = new Employee({
            id: generateId(),
            name: {
                first: source.firstName,
                last: source.lastName
            },
            pay: {
                type: source.payType,
                rate: parseFloat(source.payRate),
                isHourly: source.payType === 'hourly'
            }
        });

        toSave.save(function (err) {
            finished();
        });
        // employees.push({
        //     id: generateId(),
        //     name: {
        //         first: source.firstName,
        //         last: source.lastName,
        //         print: function () {
        //             return this.first + " " + this.last;
        //         }
        //     },
        //     pay: {
        //         type: source.payType,
        //         rate: parseFloat(source.payRate),
        //         isHourly: source.payType === 'hourly'
        //     },
        //     hours: {}
        // });
    }
};