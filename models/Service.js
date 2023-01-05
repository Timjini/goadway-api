const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    title : { type: String, required: true , unique: true },
    slug : { type: String, required: true , unique: true },
    description : { type: String, required: true },
    content : { type: String, required: false },
    image : { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
    categories : { type: Array, required: false },
});


module.exports = mongoose.model('Service', ServiceSchema);