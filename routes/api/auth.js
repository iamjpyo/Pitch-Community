const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc Fetch database data
// @access Public
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router; 