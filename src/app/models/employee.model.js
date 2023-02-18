const mongoose = require('mongoose');
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

const EmployeeSchema = mongoose.Schema({
    _id: { type: String, default:"UI"+rString.substring(0,10)},
    name: String,
    email_address: String,
    phone_number: Number,
    gender: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);