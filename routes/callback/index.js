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

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  process.env.URL_CALLBACK
);

const { people } = google.people({
  version: 'v1',
  auth: oauth2Client
});

module.exports = withSession(async (req, res) => {
  const { query } = parse(req.url);
  const { code } = querystring.parse(query);
  try {
    const user = await getUser(oauth2Client, code, people);
    req.session.user = JSON.stringify(user);
    redirect(res, 301, '/');
  } catch (err) {
    throw new Error(`There's been a problem with redirect: ${err}`);
  }
});
