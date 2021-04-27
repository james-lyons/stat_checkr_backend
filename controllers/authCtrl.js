// ------------------------------------ Modules ------------------------------------ //

const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const db = require('../models');
const validateUser = require('../middleware/validateUser');

// ---------------------------------- Controllers ---------------------------------- //

const register = (req, res) => {
   console.log('Logging Register Req:', req.body);
   const { errors, notValid } = validateUser(req.body);
   const { name, email, profile_pic } = req.body;

   console.log('Hi from register 1', req.body);

   if (notValid) {
      return res.status(400).json({
         status: 400,
         errors,
         message: 'Please enter all fields correctly',
      });
   }

   db.User.findOne({ email: req.body.email }, (findUserError, foundUser) => {
      if (findUserError)
         return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again',
            error: findUserError,
         });

      console.log('Hi from register 2');

      if (foundUser)
         return res.status(400).json({
            status: 400,
            message: 'Please try again',
            error: { message: 'Email already registered.' },
         });

      bcrypt.genSalt(10, (genSaltError, salt) => {
         if (genSaltError)
            return res.status(500).json({
               status: 500,
               message: 'Something went wrong, please try again.',
               error: genSaltError,
            });

         console.log('Hi from register 3');

         bcrypt.hash(req.body.password, salt, (hashPasswordError, hash) => {
            if (hashPasswordError)
               return res.status(500).json({
                  status: 500,
                  message: 'Something went wrong, please try again.',
                  error: hashPasswordError,
               });

            const newUser = {
               name,
               email,
               profile_pic,
               password: hash,
               password2: hash,
            };

            console.log('Hi from register 4: NEW USER', newUser);

            db.User.create(newUser, (createUserError, createdUser) => {
               if (createUserError)
                  return res.status(500).json({
                     status: 500,
                     message: 'Something went wrong, please try again.',
                     error: createUserError,
                  });

               console.log('Hi from register 5');

               return res.status(201).json({
                  status: 201,
                  message: 'Thanks for signing up!',
                  data: newUser,
               });
            });
         });
      });
   });
};

const login = (req, res) => {
   console.log('Logging Login');

   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(400).json({
         status: 400,
         message: 'Please try again.',
         error: { message: 'Please enter both your email and password' },
      });
   }

   db.User.findOne({ email }, (findUserError, foundUser) => {
      if (findUserError)
         return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.',
            error: findUserError,
         });

      if (!foundUser)
         return res.status(400).json({
            status: 400,
            message: 'Please try again.',
            error: { message: 'Email or Password is incorrect' },
         });

      bcrypt.compare(
         password,
         foundUser.password,
         (comparePasswordsError, isMatch) => {
            if (comparePasswordsError)
               return res.status(500).json({
                  status: 500,
                  message: 'Something went wrong, please try again.',
                  error: comparePasswordsError,
               });

            if (isMatch) {
               req.session.currentUser = {
                  _id: foundUser._id,
                  data: foundUser,
               };

               req.session.save((saveSessionError) => {
                  if (saveSessionError) {
                     console.log(
                        'LOGGING SAVE SESSION ERROR',
                        saveSessionError
                     );
                  }
                  const user = {
                     _id: foundUser._id,
                     name: foundUser.name,
                     email: foundUser.email,
                     // profile_pic: foundUser.profile_pic,
                  };

                  return res.status(200).json({
                     status: 200,
                     message: 'Successfully logged in.',
                     data: user,
                  });
               });
            } else {
               return res.status(400).json({
                  status: 400,
                  message: 'Please try again.',
                  error: { message: 'Email or Password is incorrect' },
               });
            }
         }
      );
   });
};

const logout = (req, res) => {
   req.session.destroy((error) => {
      if (error)
         return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.',
            error,
         });

      return res.status(201).json({
         status: 201,
         message: 'Successfully logged out.',
      });
   });
};

module.exports = {
   register,
   login,
   logout,
};
