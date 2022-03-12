const express = require('express');
const router = express.Router();
const FetchRegistrations = require("./../../models/RegistrationSchema");

// @route GET api/registration
// @desc Fetch database data
// @access Public
router.get('/', (req, res)=>{
    FetchRegistrations.find().then(result => {
        console.log('result: ', result)
        res.send(result.length > 0 ? result: 'No registrations available at this moment :(')
    })
    .catch(err=>{
        console.log(err);
    })
} 
)

module.exports = router; 