/* eslint no-undef: 0 */
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('now-env');

module.exports = passport => {
  // Strategy Config
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: 'http://localhost:8000/auth/google/callback'
      },
      // require a `verify` function, which accept credentials
      (accessToken, refreshToken, profile, done) => {
        // invoke a callback with a user object in case existis object
        done(null, profile);
      }
    )
  );
  // Used to stuff a piece of information into a cookie
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  // Used to decode the received cookie and persist session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
