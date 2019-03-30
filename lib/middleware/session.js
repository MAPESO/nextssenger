/* eslint-disable import/order */
// Keys
const { KEY_1, KEY_2 } = require('../../keys');

// Use of middleware in a much lighter way
const cookieSession = require('cookie-session')({
  name: 'user-from-google',
  keys: [KEY_1, KEY_2],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24hr
});

module.exports = fn => {
  return (req, res) => {
    cookieSession(req, res, () => fn(req, res));
  };
};
