// Packages
const { google } = require('googleapis');

// Utils
const redirect = require('../../lib/utils/redirect');

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  process.env.URL_CALLBACK
);

const scopes = ['email', 'profile', 'openid'];
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent'
});

module.exports = (req, res) => {
  redirect(res, 301, authUrl);
};
