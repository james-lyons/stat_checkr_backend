const express = require('express');

const router = express.Router();
const ctrls = require('../controllers');

router.post('/register', ctrls.auth.register);
// router.post('/login', ctrls.auth.login);
// router.post('/logout', ctrls.auth.logout);

module.exports = router;
