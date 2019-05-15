// Packages
const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Messages', MessageSchema);
