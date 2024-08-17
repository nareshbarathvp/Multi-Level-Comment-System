const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  postId: { type: String },
  replyCount: { type: Number, default: 0 },
  replyArr: { type: Array, default: [] },
  userName: { type: String, required: true },
  comment: { type: String, required: true },
  createdBy: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comments", CommentsSchema);
