// Use of middleware in a much lighter way
const cookieSession = require('cookie-session')({
  name: 'user-from-google',
  keys: [process.env.KEY_1, process.env.KEY_2],
  domain: 'chat-auth.now.sh',
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24hr
});

module.exports = fn => {
  return (req, res) => {
    cookieSession(req, res, () => fn(req, res));
  };
};
