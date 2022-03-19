const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/UserSchema');

// @route GET api/profiles/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async (req, res)=> {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);

        if(!profile){
            return res.status(400).json({msg: 'A profile has not been created for this user'});
        }

        res.json(profile);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router; 