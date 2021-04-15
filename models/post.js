const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  published: { type: Boolean, default: false, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
});

module.exports = mongoose.model('Post', PostSchema);
