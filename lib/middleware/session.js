// Use of middleware in a much lighter way
const cookieSession = require('cookie-session')({
  name: 'user-from-google',
  keys: [process.env.COOK_KEY_1, process.env.COOK_KEY_2],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24hr
});

module.exports = fn => {
  return (req, res) => {
    cookieSession(req, res, () => fn(req, res));
  };
};
