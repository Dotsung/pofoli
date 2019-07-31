import User from 'models/User';
import Follow from 'models/Follow';

import { decodeToken } from 'jwt/jwt_token';
import uploadFile from 's3/uploadFile';

export const getProfile = async (ctx) => {
  const { username } = ctx.params;

  try {
    const user = await User.findByUsername(username);

    if (!user) {
      ctx.status = 404;
      return
    }

    ctx.body = {
      id:user._id,
      profile:user.profile,
      createdAt:user.createdAt
    }
  } catch (err) {
    ctx.throw(500, err)
  }
}

export const updateUserThumbnail = async (ctx) => {
  const { token } = ctx.header;
  const user = await decodeToken(token);

  const file = ctx.request.files.image;
  const { key, url } = await uploadFile({
      fileName: user._id+file.name,
      filePath: file.path,
      fileType: file.type
  });

  if (!user) {
    ctx.status = 404;
    return;
  }

  let currentUser = null
  try {
    currentUser = await User.findById(user)
  } catch (err) {
    ctx.throw(500, err)
  }

  if (!currentUser) {
    ctx.status = 403  // 권한 없음
    return;
  }

  currentUser.profile.thumbnail = url;
  ctx.body = await currentUser.save();
}

export const updateUserInfo = async (ctx) => {
  const { token } = ctx.header;
  const user = await decodeToken(token);

  const {
    introduction,
    email,
    site
  } = ctx.request.body;

  if (!user) {
    ctx.status = 404;
    return;
  }

  let currentUser = null
  try {
    currentUser = await User.findById(user)
  } catch (err) {
    ctx.throw(500, err)
  }

  if (!currentUser) {
    ctx.status = 403  // 권한 없음
    return;
  }

  currentUser.profile.introduction = introduction;
  currentUser.profile.email = email;
  currentUser.profile.site = site;
  
  ctx.body = await currentUser.save();
}

export const follow = async (ctx) => {
  const { token } = ctx.header;
  const user = await decodeToken(token);

  const { followed } = ctx.request.body;

  if (!user) {
    ctx.status = 404;
    return;
  }

  let currentUser = null;
  try {
    currentUser = await User.findById(user)
  } catch (err) {
    ctx.throw(500, err);
  }

  if (!currentUser) {
    ctx.status = 403;  // 권한 없음
    return;
  }

  let followedUser = null;
  try {
    followedUser = await User.findByUsername(followed)
  } catch (err) {
    ctx.throw(500, err);
  }

  if (!followedUser) {
    ctx.status = 403;  // 권한 없음
    return;
  }

  const existFollow = await Follow.findOne({ follower: currentUser._id, followed: followedUser._id });

  if(existFollow === null){
    const follow = new Follow({
      follower: currentUser._id,
      followed: followedUser._id
    });

    try {
      const newFollow = await follow.save();
      const newCurrentUser = await currentUser.updateFollowing();
      const newFollowedUser = await followedUser.updateFollower();
      ctx.body = newFollow;
    } catch (err) {
      ctx.throw(500, err)
    }
  } else {
    {
      ctx.body = '이미 존재함';
    }
  }
}


export const unfollow = async (ctx) => {
  const { token } = ctx.header;
  const user = await decodeToken(token);

  const { followed } = ctx.request.body;

  if (!user) {
    ctx.status = 404;
    return;
  }

  let currentUser = null;
  try {
    currentUser = await User.findById(user)
  } catch (err) {
    ctx.throw(500, err);
  }

  if (!currentUser) {
    ctx.status = 403;  // 권한 없음
    return;
  }

  let followedUser = null;
  try {
    followedUser = await User.findByUsername(followed)
  } catch (err) {
    ctx.throw(500, err);
  }

  if (!followedUser) {
    ctx.status = 403;  // 권한 없음
    return;
  }

  const existFollow = await Follow.findOne({ follower: currentUser._id, followed: followedUser._id });

  if(existFollow){
    try {
      await existFollow.remove()
      const newCurrentUser = await currentUser.updateFollowing();
      const newFollowedUser = await followedUser.updateFollower();
      ctx.body = newCurrentUser;
    } catch (err) {
      ctx.throw(500, err)
    }
  } else {
    {
      ctx.body = '존재하지 않음';
    }
  }
}


export const getFollowing = async (ctx) => {
  // const { token } = ctx.header;
  // const user = await decodeToken(token);

  const { userid } = ctx.params;
console.log(userid)
  try {
    const followList = await Follow.find({follower: userid});
    const followingList = await Promise.all(followList.map(async (follow) => { 
      const user = await User.findById(follow.followed)
      return user.profile;
    }));
    ctx.body = followingList;
  } catch (err) {
    ctx.throw(500, err)
  }
}

export const getFollower = async (ctx) => {
  // const { token } = ctx.header;
  // const user = await decodeToken(token);

  const { userid } = ctx.params;

  console.log(userid);

  try {
    const followList = await Follow.find({followed: userid});
    const followerList = await Promise.all(followList.map(async (follow) => { 
      const user = await User.findById(follow.follower)
      return user.profile;
    }));
    ctx.body = followerList;
  } catch (err) {
    ctx.throw(500, err)
  }
}