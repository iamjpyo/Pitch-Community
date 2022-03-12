const express = require('express');
const router = express.Router();

// @route GET api/profiles
// @desc Fetch database data
// @access Public
router.get('/', (req, res)=> res.send('Profiles route'));

module.exports = router; 