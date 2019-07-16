import User from 'models/User';

import { decodeToken } from 'jwt/jwt_token';
import uploadFile from 's3/uploadFile';

exports.getProfile = async (ctx) => {
  const { username } = ctx.params;

  try {
    const user = await User.findByUsername(username);

    if (!user) {
      ctx.status = 404;
      return
    }

    ctx.body = {
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