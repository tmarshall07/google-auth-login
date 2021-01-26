module.exports = (passport) => {
  // Used to serialize the user for the session on the front end (only expose user id)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Used to deserialize the user for use on the backend
  passport.deserializeUser((id, done) => {
    // Find user
    done(err, user);
  });
};