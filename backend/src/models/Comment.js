import mongoose from 'mongoose'

const Comment = new mongoose.Schema({
  body: String,
  authorThumbnail: String,
  authorUsername: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  writed: false,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Comment', Comment)