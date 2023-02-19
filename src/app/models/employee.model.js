const mongoose = require('mongoose');

function randomStr(len, arr) {
    var ans = '';
    for (var i = len; i > 0; i--) {
        ans +=
        arr[Math.floor(Math.random()*arr.length)];
    }
    return ans;
}
var rString = randomStr(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

const EmployeeSchema = mongoose.Schema({
    _id: { type: String, default:"UI"+rString.substring(0,10)},
    name: String,
    email_address: String,
    phone_number: Number,
    gender: String,
    cafeID: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);