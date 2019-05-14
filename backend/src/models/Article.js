import mongoose from 'mongoose'

const Article = new mongoose.Schema({
  id: Number,
  title: String,
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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

export default mongoose.model('Article', Article) 