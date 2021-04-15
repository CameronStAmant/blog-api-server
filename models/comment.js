const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  body: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
