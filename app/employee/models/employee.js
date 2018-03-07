var mongoose = require('mongoose');

var scheme = mongoose.Schema({
    id: {type: Number},
    name: {
        first: {type: String},
        last: {type: String}
    },
    pay: {
        type: {type: String},
        rate: {type: Number},
        isHourly: {type: Boolean}
    },
    hours: {type: Object}
});

module.exports = mongoose.model('employee', scheme);