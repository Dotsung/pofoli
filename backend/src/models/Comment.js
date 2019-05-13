import mongoose from 'mongoose'

const Comment = new mongoose.Schema({
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  article: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Comment', Comment) 