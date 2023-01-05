const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name : { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Category', CategorySchema);
