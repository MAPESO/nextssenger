// Middleware
const withSession = require('../../lib/middleware/session');

// Utils
const redirect = require('../../lib/utils/redirect');

module.exports = withSession((req, res) => {
  // Destroying the session (this includes the cookie)
  req.session = null;
  redirect(res, 301, '/');
});
