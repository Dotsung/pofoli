import User from 'models/User';
import Post from 'models/Post';

export const heart = async (ctx) => {
    const { _id, postid } = ctx.request.body;
    let user, newuser = null;
    let post, newpost = null;

    try{
        user = await User.findById(_id);
        post = await Post.findById(postid);
      if (!user) {
        console.log('user not found');
        ctx.status = 404
        return
      }
      
      if (!post) {
        console.log('post not found');
        ctx.status = 404
        return
      }

    } catch (err) {
      ctx.throw(500, err)
    }

    try {
        newuser = await user.heart(postid);
        newpost = await post.updateHearts();
    } catch (err) {
        ctx.throw(500, err)
    } 
  
    ctx.body = newpost;
}

export const unheart = async (ctx) => {
    const { _id, postid } = ctx.request.body;
    let user, newuser = null;
    let post, newpost = null;

    try{
        user = await User.findById(_id);
        post = await Post.findById(postid);
      if (!user) {
        console.log('user not found');
        ctx.status = 404
        return
      }
      
      if (!post) {
        console.log('post not found');
        ctx.status = 404
        return
      }

    } catch (err) {
      ctx.throw(500, err)
    }

    try {
        newuser = await user.unheart(postid);
        newpost = await post.updateHearts();
    } catch (err) {
        ctx.throw(500, err)
    } 
  
    ctx.body = newpost;
}

export const star = async (ctx) => {
  const { _id, postid } = ctx.request.body;
  let user, newuser = null;
  let post, newpost = null;

  try{
      user = await User.findById(_id);
      post = await Post.findById(postid);
    if (!user) {
      console.log('user not found');
      ctx.status = 404
      return
    }
    
    if (!post) {
      console.log('post not found');
      ctx.status = 404
      return
    }

  } catch (err) {
    ctx.throw(500, err)
  }

  try {
      newuser = await user.star(postid);
      newpost = await post.updateStars();
  } catch (err) {
      ctx.throw(500, err)
  } 

  ctx.body = newpost;
}

export const unstar = async (ctx) => {
  const { _id, postid } = ctx.request.body;
  let user, newuser = null;
  let post, newpost = null;

  try{
      user = await User.findById(_id);
      post = await Post.findById(postid);
    if (!user) {
      console.log('user not found');
      ctx.status = 404
      return
    }
    
    if (!post) {
      console.log('post not found');
      ctx.status = 404
      return
    }

  } catch (err) {
    ctx.throw(500, err)
  }

  try {
      newuser = await user.unstar(postid);
      newpost = await post.updateStars();
  } catch (err) {
      ctx.throw(500, err)
  } 

  ctx.body = newpost;
}