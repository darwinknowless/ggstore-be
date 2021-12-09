const express = require('express');
const router = express.Router();
const { viewSignin } = require('./controller');

/* GET home page. */
router.get('/', viewSignin);

module.exports = router;
