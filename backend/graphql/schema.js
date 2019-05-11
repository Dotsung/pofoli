const dao = require('../business/dao');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    users: [User]
    user(email: String!): User
    posts: [Post]
  }

  type Mutation {
    createUser(email: String!, pwd: String!): User
    createPost(title: String!, content: String!, author: String!): Post
  }

  type User{
    id: String
    email: String
    pwd: String
    c_date: String
  }

  type Post{
    id: String
    title: String,
    content: String,
    author: User
    c_date: String
  }
`);
// 맞춤 스칼라 타입 지정은 어떻게?
var resolver = {
  users: async (args, context, info) => {
    return await dao.cm.getAllUsers();
  },
  user: async (args, context, info) => {
    const {email} = args;

    return await dao.cm.getUser(email);
  },
  createUser: async (args, context, info) => {
    const {email, pwd} = args;

    return await dao.cm.joinUser(email, pwd);
  },
  posts: async (args, context, info) => {
    return await dao.post.getAllPosts();
  },
  createPost: async (args, context, info) => {
    return await dao.post.createPost(args);
  },
};

module.exports = {schema: schema, root: resolver};