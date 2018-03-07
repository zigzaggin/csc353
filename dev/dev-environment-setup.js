module.exports = function (employees) {
    employees.add({
        firstName: "Ben",
        lastName: "Potter",
        payRate: "15",
        payType: "hourly"
    });

    employees.add({
        firstName: "Mikey",
        lastName: "Mouse",
        payRate: "15000",
        payType: "hourly"
    });

    employees.add({
        firstName: "Walt",
        lastName: "Disney",
        payRate: "13000000",
        payType: "salary"
    })
};