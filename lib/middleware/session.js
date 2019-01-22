const cookieSession = require('cookie-session')({
  keys: [process.env.KEY_1, process.env.KEY_2],
  maxAge: 24 * 60 * 60 * 1000 // 24hr
});

module.exports = fn => {
  return (req, res) => {
    cookieSession(req, res, () => fn(req, res));
  };
};
