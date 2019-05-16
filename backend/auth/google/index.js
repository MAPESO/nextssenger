// Packages
const { google } = require('googleapis');

// Utils
const redirect = require('../../lib/utils/redirect');

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://nextssenger.now.sh/auth/google'
);

const scopes = ['email', 'profile', 'openid'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent'
});

module.exports = (req, res) => {
  redirect(res, 303, authUrl);
};
