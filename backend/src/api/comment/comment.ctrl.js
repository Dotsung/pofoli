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
        postid: currentPost._id,
        author: currentUser._id
    });

    try {
      ctx.body = await comment.save();
    } catch (err) {
      ctx.throw(500, err)
    }
}