const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const GoogleStrategy = require('passport-google-token').Strategy;

/**
 * Registers all passport authentication strategiess
 *
 * @param {Object} passport - passport object
 */
exports.register = (passport) => {
  // Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  const callbackURL =
    process.env.NODE_ENV === 'dev'
      ? 'http://localhost:8080/api/auth/google/callback'
      : 'https://www.mealwrm.com/api/auth/google/callback';

  passport.use(
    'google-token-login',
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL,
      },
      async (accessToken, refreshToken, data, done) => {
        const info = data._json;
        if (info.email) {
          // Find user
          if (user) {
            return done(null, user);
          }
        }

        return done(null, false);
      },
    ),
  );

  passport.use(
    'google-token-register',
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL,
      },
      async (accessToken, refreshToken, data, done) => {
        const info = data._json;
        if (info.email) {
          const { email } = info;
          // Check for existing, create otherwise

          return done(null, newUser);
        }

        return done(null, false);
      },
    ),
  );
};
