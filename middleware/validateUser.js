module.exports = ({ name, email, profile_pic, password, password2 }) => {
   const errors = [];

   if (!name) {
      errors.push({ message: 'Please enter your name' });
   }

   if (!email) {
      errors.push({ message: 'Please enter your email' });
   }

   if (!profile_pic) {
      errors.push({ message: 'Please enter a profile picture' });
   }

   if (!password) {
      errors.push({ message: 'Please enter your password' });
   }

   if (!password2) {
      errors.push({ message: 'Please enter your password' });
   }

   if (password !== password2) {
      errors.push({ message: 'Passwords must match' });
   }

   return {
      errors,
      notValid: Boolean(errors.length),
   };
};
