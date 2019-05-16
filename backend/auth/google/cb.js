// Native
const { parse } = require('url');

// Packages
const { google } = require('googleapis');
const querystring = require('querystring');
const Cookies = require('cookies');

// Helpers
const getUser = require('../../lib/helpers/getUser');

// Utils
const redirect = require('../../lib/utils/redirect');

const { OAuth2 } = google.auth;
const oauth2Clietn = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://nextssenger.now.sh/auth/google'
);

const { people } = google.people({
  version: 'v1',
  auth: oauth2Clietn
});

module.exports = async (req, res) => {
  const { query } = parse(req.url);
  const { code } = querystring.parse(query);
  const user = await getUser(oauth2Clietn, code, people);
  const cookies = new Cookies(req, res, {
    keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2]
  });
  cookies.set('from-user-google', JSON.stringify(user), {
    signed: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  });
  redirect(res, 303, '/');
};
