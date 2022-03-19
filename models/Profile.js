const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user:{
        //Connecting this schema to the UserSchema with user as a reference
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    currentTeam: {
        type: String,
        required: true
    },
    previousTeam: {
        type: String
    },
    currentLocation : {
        type: String,
        required: true
    },
    hometown:{
        type: String,
        required: true
    },
    //Coach or player?
    status: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);