const express = require('express');

const router = express.Router();
const ctrls = require('../controllers');

router.post('/register', ctrls.auth.register);

module.exports = router;
