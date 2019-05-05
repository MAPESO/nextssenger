// DB
const connect = require('../../db/index');

// Model
const Message = require('../../models/Message');

module.exports = async (req, res) => {
  await connect();
  const messages = await Message.find();
  res.end(JSON.stringify(messages));
};
