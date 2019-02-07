// Native
const { parse } = require('url');

// Packages
const { google } = require('googleapis');
const querystring = require('querystring');

// Helpers
const getUser = require('../../lib/helpers/getUser');

// Middleware
const withSession = require('../../lib/middleware/session');

// Utils
const redirect = require('../../lib/utils/redirect');

const plus = google.plus('v1');
const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  process.env.URL_CALLBACK
);

module.exports = withSession((req, res) => {
  const { query } = parse(req.url);
  const { code } = querystring.parse(query);
  const user = getUser(oauth2Client, code, plus);
  user
    .then(result => {
      req.session.user = JSON.stringify(result);
      redirect(res, 301, '/');
    })
    .catch(err => {
      throw new Error(`There's been a problem with redirect: ${err}`);
    });
});
