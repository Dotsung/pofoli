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
  comments: { type:Number, default:0 },
  stars:{ type:Number, default:0 },
  hearted:{ type:Boolean, default:false },
  stared:{ type:Boolean, default:false },
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

Post.methods.updateStars = function() {
  var post = this;
  return User.countDocuments({ 'profile.stared': { $in: [post._id] } }).then(function(count){
    post.stars = count;

    return post.save();
  });
};

export default mongoose.model('Post', Post)