// Packages
const { google } = require('googleapis');

// Utils
const redirect = require('../../lib/utils/redirect');

// Keys
const { GOOGLE_ID, GOOGLE_SECRET, URL_CALLBACK } = require('../../keys');

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(GOOGLE_ID, GOOGLE_SECRET, URL_CALLBACK);

const scopes = ['email', 'profile', 'openid'];
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

module.exports = (req, res) => {
  redirect(res, 301, authUrl);
};
