import mongoose from 'mongoose'
import User from './User';

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

Post.methods.updateHearts = function() {
  var post = this;
  return User.countDocuments({ 'profile.hearted': { $in: [post._id] } }).then(function(count){
    post.hearts = count;

    return post.save();
  });
};

export default mongoose.model('Post', Post)