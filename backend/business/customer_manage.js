module.exports = (function(){
    const model = require('../mongoose/model');

    // https://mongoosejs.com/docs/guide.html#id
    async function getUser(email){
        return await model.User.findOne({email: email}); // 없을땐 null
    }

    async function getAllUsers(){
        return await model.User.find();
    }

    async function joinUser(email, pwd){
        if(await getUser(email)) throw "email is existed";

        const newUser = new model.User({email: email, pwd: pwd});
        const result = await newUser.save();

        return result;
    }

    return {
        getUser: getUser,
        getAllUsers: getAllUsers,
        joinUser: joinUser,
    };
})();