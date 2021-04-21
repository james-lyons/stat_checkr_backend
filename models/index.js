const mongoose = require('mongoose');
const MONGODB_URI =
   process.env.MONGODB_URL || 'mongodb://localhost:27017/stat_checkr';

mongoose
   .connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
   })
   .then(() => console.log('MongoDB has successfully connected.'))
   .catch((err) => console.log(err));

module.exports = {
   User: require('./User'),
};
