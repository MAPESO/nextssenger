// Utils
const redirect = require('../lib/utils/redirect');

module.exports = (req, res) => {
  res.setHeader('set-cookie', 'from-user-google=; max-age=0');
  redirect(res, 303, '/');
};
