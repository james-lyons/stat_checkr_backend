module.exports = (req, res, next) => {
   if (!req.session.currentUser) {
      console.log('LOGGING AUTHREQUIRED:', req.session);

      return res.status(401).json({
         status: 401,
         error: { message: 'Unauthorized. Must be logged in.' },
      });
   }
   next();
};
