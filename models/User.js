const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: false, default: '' },
    timestamp: { type: Date, default: Date.now }
});




module.exports = mongoose.model('User', UserSchema);