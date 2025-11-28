const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  userId: { type: String, default: 'anon' },
  role: { type: String, enum: ['user','assistant'], required: true },
  message: { type: String, required: true },
  meta: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);
