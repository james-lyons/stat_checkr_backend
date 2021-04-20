// ------------------------------------ Modules ------------------------------------ //

// const db = require('../models');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
// const validateUser = require('../middleware/validateUser');

// ---------------------------------- Controllers ---------------------------------- //

const register = (req, res) => {
   console.log('Logging Register Req:', req);
};

module.exports = {
   register,
};
