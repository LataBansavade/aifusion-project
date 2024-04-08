const mongoose = require('mongoose');

const saveChatSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// Create a compound index on role and content fields
saveChatSchema.index({ role: 1, content: 1 }, { unique: true });

const saveChatModel = mongoose.model('SaveChat', saveChatSchema);

module.exports = saveChatModel;
