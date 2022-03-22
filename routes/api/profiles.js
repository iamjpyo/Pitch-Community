const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

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


// @route  POST api/profiles
// @desc   Create or update user profile
// @access Private

router.post('/', [auth,[
    check('currentLocation', 'Location is required').not().isEmpty(),
    check('hometown', 'Please let us know where you are originally from').not().isEmpty(),
    check('role', 'Coach or Player role is required').not().isEmpty(),
    check('level', 'Please confirm your level status').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const {
        currentTeam,
        previousTeam,
        currentLocation,
        hometown,
        role,
        level
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(currentTeam) profileFields.currentTeam = currentTeam;
    if(previousTeam) profileFields.previousTeam = previousTeam;
    if(currentLocation) profileFields.currentLocation = currentLocation;
    if(hometown) profileFields.hometown = hometown;
    if(role) profileFields.role = role;
    if(level) profileFields.level = level;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        //If there is an existing profile it will be UPDATED
        if(profile) {
            //Update
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, { new: true });

            return res.json(profile);
        }

        //If there is NO PROFILE FOUND a new one has to be CREATED
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);

    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

})

module.exports = router; 