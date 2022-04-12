const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
//Using package express-validator to check if conditions I choose to add per value are validated.
const {check, validationResult} = require('express-validator');
const config = require('config');
const bcrypt = require('bcryptjs');

const User = require('../../models/UserSchema');

// @route GET api/auth
// @desc Fetch database data
// @access Public
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


    // @route   POST api/auth
    // @desc    Authenticate user and get token
    // @access  Public
    router.post('/', 
    [
        check('email', "Please include a valid email to create an account").isEmail(),
        check('password', 'Password is required').exists()
    ], 
    async (req, res)=> {
        const errors = validationResult(req);
        //if there are errors then user gets a response, 400 in this case...then an array response of all the different errors.
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        
        const {email, password} = req.body //deconstructed body
        
        try{
            // See if there is no user
            let user = await User.findOne( {email} );
            
            if(!user) {
                return res.status(400).json({ errors: [{msg: 'Invalid credentials'}]});
            }
            
           const isMatch = await bcrypt.compare(password, user.password);

           if(!isMatch){
               return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]})
           }
            
            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };
            
            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000},
            (err, token)=>{
                if(err) throw err;
                res.json({ token});nyth
            }
            );
            
        } catch (err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
        
        
    });

module.exports = router; 