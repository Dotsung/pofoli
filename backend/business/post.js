module.exports = (function(){
    const model = require('../mongoose/model');
  
    async function createPost({title, content, author}){
      const newPost = new model.Post({title: title, content: content, author: author});
  
      const result = await newPost.save();
      return await result.populate('author').execPopulate();
    }
  
    async function getAllPosts(){
      return await model.Post.find().populate('author');
    }
  
    return {
      createPost: createPost,
      getAllPosts: getAllPosts,
    };
  
  })();