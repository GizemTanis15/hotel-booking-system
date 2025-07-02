// models/Comment.js
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  temizlik: { type: Number, min: 1, max: 5 },
  servis: { type: Number, min: 1, max: 5 },
  konfor: { type: Number, min: 1, max: 5 },
  // İstersen diğer kategorileri de ekleyebilirsin
}, { _id: false });

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  roomId: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  scores: scoreSchema,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);
