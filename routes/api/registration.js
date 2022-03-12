const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const RegistrationSchema = require('./../../models/RegistrationSchema');

// @route POST api/registration
// @desc Register form into database
// @access Public
router.post('/', 
[check('name', 'Name is required. Please enter your name.').not().isEmpty(),
 check('email', 'Please enter a valid email address').isEmail(),
 check('message', 'A message is required to know the purpose of your inquiry. Please include a note.').not().isEmpty()], 
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    var myData = new RegistrationSchema(req.body);
    myData.save()
    .then(item => {
        res.send('Registration entered successfully!')
    })

});

module.exports = router;