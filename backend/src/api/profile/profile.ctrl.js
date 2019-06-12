import User from 'models/User';

export const heart = async (ctx) => {
    const { _id, post } = ctx.request.body;
  
    try{
      const user = await User.update({ _id: _id }, {$push: { profile: { hearted: post }}});
  
      if (!user) {
        ctx.status = 404
        return
      }
  
      console.log(user);
  
    } catch (err) {
      ctx.throw(500, err)
    }
  
    ctx.body='aa';
}