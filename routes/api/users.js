const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Using package express-validator to check if conditions I choose to add per value are validated.
const {check, validationResult} = require('express-validator');
const User = require('../../models/UserSchema');
const config = require('config');
const Config = require('../../config/default.json')

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', 
[
        //Checking each value with a condition and message to display if condition is not met
        //first check. looking for name and .not().isEmpty is to ensure that field is not empty
    check('name', 'Name is required to create an account').not().isEmpty(),
        //Checking for valid email
    check('email', "Please include a valid email to create an account").isEmail(),
        //Checking for password with minimum of 6 characters
    check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 })
], 
async (req, res)=> {
    const errors = validationResult(req);
        //if there are errors then user gets a response, 400 in this case...then an array response of all the different errors.
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

const {name, email, password} = req.body //deconstructed body

    try{
    // See if user exists
        let user = await User.findOne( {email} );

        if(user) {
           return res.status(400).json({ errors: [{msg: 'User already exists'}]});
        }

        //new instance of user up to now
        user = new User({
            name,
            email,
            password
        });
    // Encrypt Password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken
    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000},
    (err, token)=>{
        if(err) throw err;
        res.json({ token});
    }
    );

    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }


});

module.exports = router; 
