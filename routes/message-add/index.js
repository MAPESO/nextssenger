// DB
const connect = require('../../db/index');

// Middleware
const withBodyParser = require('../../lib/middleware/bodyParser');
const withSession = require('../../lib/middleware/session');

// Models
const Message = require('../../models/Message');

// Utils
const redirect = require('../../lib/utils/redirect');

module.exports = withSession(
  withBodyParser(async (req, res) => {
    await connect();
    const { user } = req.session;
    const { message } = req.body;
    const { displayName } = JSON.parse(user);
    const newMessage = new Message({ username: displayName, message });
    await newMessage.save();
    redirect(res, 301, '/');
  })
);
