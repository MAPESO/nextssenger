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

// Keys
const { GOOGLE_ID, GOOGLE_SECRET, URL_CALLBACK } = require('../../keys');

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(GOOGLE_ID, GOOGLE_SECRET, URL_CALLBACK);

const { people } = google.people({
  version: 'v1',
  auth: oauth2Client
});

module.exports = withSession((req, res) => {
  const { query } = parse(req.url);
  const { code } = querystring.parse(query);
  const user = getUser(oauth2Client, code, people);
  user
    .then(result => {
      req.session.user = JSON.stringify(result);
      redirect(res, 301, '/');
    })
    .catch(err => {
      throw new Error(`There's been a problem with redirect: ${err}`);
    });
});
