import User from 'models/User';
import Post from 'models/Post';

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