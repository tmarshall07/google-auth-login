const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const database = require('../database');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

/**
 * Registers all passport authentication strategiess
 *
 * @param {Object} passport - passport object
 */
exports.register = (passport) => {
  const callbackURL = 'http://localhost:8080/auth/google/callback'

    // Use Google oauth2 strategy
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL,
      },
      (accessToken, refreshToken, data, done) => {
        // Find user email in mock database
        const user = database.users.find((user) => user.email === data._json.email);
        if (user) return done(null, user);

        return done();
      }
    ));
};
