const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name : { type: String, required: true },
    excerpt : { type: String, required: false },
    slug : { type: String, required: true },
    category : { type: String, required: false },
    image : { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);