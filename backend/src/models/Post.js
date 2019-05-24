import mongoose from 'mongoose'

const Post = new mongoose.Schema({
  id: Number,
  title: String,
  body: String,
  authorThumbnail: String,
  authorUsername: String,
  image: String,
  hearts:{ type:Number, default:0 },
  views:{ type:Number, default:0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  stars:{ type:Number, default:0 },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Post', Post)