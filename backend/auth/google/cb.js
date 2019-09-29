/* eslint new-cap: 0 */

// Native
const { parse } = require('url');

// Packages
const { google } = require('googleapis');
const querystring = require('querystring');
const ms = require('ms');
const Cookies = require('cookies');
const jwt = require('jsonwebtoken');
const ChatKit = require('@pusher/chatkit-server');

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
  const { displayName, id, url } = await getUser(oauth2Clietn, code, people);
  const chatKit = new ChatKit.default({
    key: process.env.CHATKIT_SECRET,
    instanceLocator: process.env.CHATKIT_LOCATOR
  });
  const user = await chatKit.getUsersById({ userIds: id });
  if (user.length) {
    // el usuario existe
    const cookies = new Cookies(req, res, {
      keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2]
    });
    const token = jwt.sign({ displayName, url, id }, process.env.JWT_KEY);
    cookies.set('from-user-google', token, {
      signed: true,
      maxAge: ms('1y'),
      expires: ms('1y')
    });
    redirect(res, 303, '/');
  } else if (user.length === 0) {
    // el usario no existe
    const cookies = new Cookies(req, res, {
      keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2]
    });
    const token = jwt.sign({ displayName, url, id }, process.env.JWT_KEY);
    cookies.set('from-user-google', token, {
      signed: true,
      maxAge: ms('1y'),
      expires: ms('1y')
    });
    await chatKit.createUser({ id, name: displayName, avatarURL: url });
    redirect(res, 303, '/');
  }
};
