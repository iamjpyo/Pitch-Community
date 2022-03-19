const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    telephone: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});

module.exports = Registration = mongoose.model('user', UserSchema);