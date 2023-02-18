const mongoose = require('mongoose');
var uuid = require('node-uuid');

const CafeSchema = mongoose.Schema({
    // id: { type: mongoose.Schema.Types.ObjectId, required: false },
    _id: { type: String, default: function genUUID() {
        return uuid.v1()
    }},
    name: String,
    description: String,
    location: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Cafe_shope', CafeSchema);
