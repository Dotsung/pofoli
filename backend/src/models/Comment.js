import mongoose from 'mongoose'

const Comment = new mongoose.Schema({
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Comment', Comment)