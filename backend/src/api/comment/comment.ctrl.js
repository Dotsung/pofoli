import Comment from 'models/Comment';
import User from 'models/User'
import Post from 'models/Post';
import Joi from 'joi';

import { decodeToken } from "jwt/jwt_token";

export const write = async (ctx) => {
    // 사용자 로그인 상태 확인
    const { token } = ctx.header;
    const user = await decodeToken(token);

    const { body, postid } = ctx.request.body;
  
    let currentUser = null;
    try {
      currentUser = await User.findById(user)
    } catch (err) {
      ctx.throw(500, err)
    }
  
    if (!currentUser) {
      ctx.status = 403  // 권한 없음
      return
    }

    let currentPost = null;
    try {
      currentPost = await Post.findById(postid)
    } catch (err) {
      ctx.throw(500, err)
    }
  
    if (!currentPost) {
      ctx.status = 404
      return
    }
    
    const comment = new Comment({
        body,
        authorThumbnail: currentUser.profile.thumbnail,
        authorUsername: currentUser.profile.username,
        post: currentPost._id,
    });

    try {
      const newComment = await comment.save();
      const newPost = await currentPost.updateComments();
      ctx.body = newComment;
    } catch (err) {
      ctx.throw(500, err)
    }
}

exports.list = async (ctx) => {
  const { token } = ctx.header;
  const { postid } = ctx.params;

  let user = null;
  let currentUser = null;

  try{
    user = await decodeToken(token);
    currentUser = await User.findById(user);
    } catch (err) {
  }


  if(currentUser){
    try {
      const commentlist = await Comment.find({ post: postid }).exec();
      
      const newList = await Promise.all( commentlist.map(async (comment, index) => {
        if(currentUser.username === comment.authorUsername){
          comment.writed = true;
        }
        return comment;
      }));

      ctx.body = newList;
    } catch (err) {
      ctx.throw(500, err)
    }
  } else {
    try {
      const commentlist = await Comment.find({ post: postid }).exec();
      ctx.body = commentlist;
    } catch (err) {
      ctx.throw(500, err)
    }
  }
}