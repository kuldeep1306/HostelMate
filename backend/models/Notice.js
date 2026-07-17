const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', noticeSchema);
