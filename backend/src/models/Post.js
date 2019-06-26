import mongoose from 'mongoose'
import User from './User';
import Heart from './Heart';
import Star from './Star';
import Comment from './Comment';

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
  }
});

Post.methods.updateHearts = function() {
  var post = this;
  return Heart.countDocuments({ postid: post._id }).then(function(count){
    post.hearts = count;

    return post.save();
  });
};

Post.methods.updateStars = function() {
  var post = this;
  return Star.countDocuments({ postid: post._id }).then(function(count){
    post.stars = count;

    return post.save();
  });
};

Post.methods.updateComments = function() {
  var post = this;
  return Comment.countDocuments({ post: post._id }).then(function(count){
    post.comments = count;

    return post.save();
  });
};

export default mongoose.model('Post', Post)