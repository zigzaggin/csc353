var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://csc353:Password1@ds135624.mlab.com:35624/csc3535');

var app = express();

var employees = require('./app/employee/employee-controller');
// require('./dev/dev-environment-setup')(employees);
var payoutEngine = require('./app/employee/payout-engine');

app.set('views', 'views');
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/employees', function (req, resp) {
    employees.load(function (emps) {
        resp.render('employees', {
            title: "Employees",
            employees: emps
        });
    })
});

app.get('/employees/new', function (req, resp) {
    resp.render('employee-add', {title: "Employee Add"});
});

app.post('/employees/new', function (req, resp) {
    employees.add(req.body, function () {
        resp.redirect("/employees");
    });
});

app.get('/employees/pay', function (req, resp) {
    payoutEngine.run(employees.load(), function (result) {
        resp.render('pay', {title: "Payout", employees: result});
    });
});

app.get('/employees/:employeeId', function (req, resp) {
    employees.findById(req.params.employeeId, function (employees) {
        var days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        resp.send({
            days: days.map(function (value) {
                return {label: value, hours: (employee.hours || {})[value]}
            })
        });
    });
});

app.post("/employees/:employeeId/add-hours", function (req, resp) {
    employees.findById(req.params.employeeId, function (employees) {
        for (var i in employees) {
            var employee = employees[i];
            if (typeof employee.hours === 'undefined')
                employee.hours = {};

            employee.hours[req.body.day] = parseInt(req.body.hours);
            employee.save(function () {
                resp.send({status: "success"});
            });
        }
    });
});

app.get('*', function (req, resp) {
    resp.redirect('/employees');
});

app.listen(3000, function () {
    console.log("Server Started on Port 3000");
});