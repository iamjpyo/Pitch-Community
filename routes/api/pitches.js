const express = require('express');
const router = express.Router();

// @route GET api/pitches
// @desc Fetch database data
// @access Public
router.get('/', (req, res)=> res.send('Pitches route'));

module.exports = router; 