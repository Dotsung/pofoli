import User from 'models/User';

export const heart = async (ctx) => {
    const { _id, post } = ctx.request.body;
    let user, newuser = null;

    try{
        user = await User.findById(_id);

      if (!user) {
        console.log('not found');
        ctx.status = 404
        return
      }
    } catch (err) {
      ctx.throw(500, err)
    }

    try {
        newuser = await user.heart(post);
        console.log(newuser);
    } catch (err) {
        ctx.throw(500, err)
    } 
  
    ctx.body = newuser;
}