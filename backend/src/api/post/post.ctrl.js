import Post from 'models/Post'
import User from 'models/User'
import Heart from 'models/Heart'
import Star from 'models/Star'
import Joi from 'joi'
import uploadFile from 's3/uploadFile';

import { decodeToken } from "jwt/jwt_token";

// 포스트 작성 (POST) API '/api/post/write'
export const write = async (ctx) => {
  // 사용자 로그인 상태 확인
  const { token } = ctx.header;
  const user = await decodeToken(token);

  const file = ctx.request.files.image

  const post = new Post();

  const { key, url } = await uploadFile({
      fileName: post._id+file.name,
      filePath: file.path,
      fileType: file.type
  });

  const req = {
    title: ctx.request.body.title,
    body: ctx.request.body.body,
    image: url
  }

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
  

  // 입력값 검증
  const data = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    image: Joi.string().required()
  })

  const result = Joi.validate(req, data)

  if (result.error) {
    console.log('joi err')
    ctx.status = 400
    ctx.body = result.error
    return
  }

  // 데이터베이스에 저장할 정보
  const { title, body, image } = req;

  console.log(currentUser);

  // 새 글 작성
  // const post = new Post({
  //   title, body, image, 
  //   authorThumbnail: currentUser.profile.thumbnail,
  //   authorUsername: currentUser.profile.username
  // })

  post.title = title;
  post.body = body;
  post.image = image;
  post.authorThumbnail = currentUser.profile.thumbnail;
  post.authorUsername = currentUser.profile.username;

  try {
    await post.save()
    ctx.body = 'ok'
  } catch (err) {
    ctx.throw(500, err)
  }
}

// 게시글 리스트 (GET) APi '/api/post/list'
exports.list = async (ctx) => {

  // 파라미터 값으로 페이지값이 없을 시 page = 1, 10진법
  const page = parseInt(ctx.params.page || 1, 10)

  if (page < 1) {
    // page가 1보다 작을 시 잘못된 요청 반환
    ctx.status = 400
    return
  }

  const { token } = ctx.header;
  let user = null;

  try{
    user = await decodeToken(token);
  } catch (err) {
  }


  if(user){
    try {
      // sort: _id 값 역순으로 정렬
      const Hearts = await Heart.find({ userid: user._id });
      const Stars = await Star.find({ userid: user._id });

      const postlist = await Post.find()
                                .sort({_id: -1})
                                .limit(15)
                                .skip((page - 1) * 15).exec();
      
      const newP = await Promise.all( postlist.map(async (post, index) => {
        let existHeart = Hearts.find(heart => heart.postid.toString() === post._id.toString());
          if(existHeart){
            post.hearted = true;
        }
        let existStar = Stars.find(star => star.postid.toString() === post._id.toString());
        if(existStar){
          post.stared = true;
        }
        return post;
      }));

      ctx.body = newP;
    } catch (err) {
      ctx.throw(500, err)
    }
  } else {
    try {
      // sort: _id 값 역순으로 정렬
      const postlist = await Post.find()
                                .sort({_id: -1})
                                .limit(15)
                                .skip((page - 1) * 15).exec()
      const lastpage = await Post.countDocuments().exec
  
      ctx.set('last-page', Math.ceil(lastpage / 10))
      ctx.body = postlist
    } catch (err) {
      ctx.throw(500, err)
    }
  }
  
}

exports.userPostList = async (ctx) => {

  // 파라미터 값으로 페이지값이 없을 시 page = 1, 10진법
  const page = parseInt(ctx.params.page || 1, 10)
  const author = ctx.params.author;

  if (page < 1) {
    // page가 1보다 작을 시 잘못된 요청 반환
    ctx.status = 400
    return
  }

  const { token } = ctx.header;
  let user = null;

  try{
    user = await decodeToken(token);
  } catch (err) {
  }


  if(user){
    try {
      // sort: _id 값 역순으로 정렬
      const Hearts = await Heart.find({ userid: user._id });
      const Stars = await Star.find({ userid: user._id });

      const postlist = await Post.find({authorUsername: author})
                                .sort({_id: -1})
                                .limit(15)
                                .skip((page - 1) * 15).exec();
      
      const newP = await Promise.all( postlist.map(async (post, index) => {
        let existHeart = Hearts.find(heart => heart.postid.toString() === post._id.toString());
          if(existHeart){
            post.hearted = true;
        }
        let existStar = Stars.find(star => star.postid.toString() === post._id.toString());
        if(existStar){
          post.stared = true;
        }
        return post;
      }));

      ctx.body = newP;
    } catch (err) {
      ctx.throw(500, err)
    }
  } else {
    try {
      // sort: _id 값 역순으로 정렬
      const postlist = await Post.find({authorUsername: author})
                                .sort({_id: -1})
                                .limit(15)
                                .skip((page - 1) * 15).exec()
      const lastpage = await Post.countDocuments().exec
  
      ctx.set('last-page', Math.ceil(lastpage / 10))
      ctx.body = postlist
    } catch (err) {
      ctx.throw(500, err)
    }
  }
}

exports.heartPostList = async (ctx) => {

  // 파라미터 값으로 페이지값이 없을 시 page = 1, 10진법
  const page = parseInt(ctx.params.page || 1, 10)
  const author = ctx.params.author;

  if (page < 1) {
    // page가 1보다 작을 시 잘못된 요청 반환
    ctx.status = 400
    return
  }

  const { token } = ctx.header;
  let user = null;

  try{
    user = await decodeToken(token);
  } catch (err) {
  }


  const authorid = await User.findByUsername(author);
  const authorHearts = await Heart.find({ userid: authorid});

  if(user){
    try {
      // sort: _id 값 역순으로 정렬
      const Hearts = await Heart.find({ userid: user._id });
      const Stars = await Star.find({ userid: user._id });

      const postlist = await Post.find({ _id: authorHearts.map((heart) => heart.postid) })
                                .sort({_id: -1})
                                .limit(15)
                                .skip((page - 1) * 15).exec();
      
      const newP = await Promise.all( postlist.map(async (post, index) => {
        let existHeart = Hearts.find(heart => heart.postid.toString() === post._id.toString());
          if(existHeart){
            post.hearted = true;
        }
        let existStar = Stars.find(star => star.postid.toString() === post._id.toString());
        if(existStar){
          post.stared = true;
        }
        return post;
      }));

      ctx.body = newP;
    } catch (err) {
      ctx.throw(500, err)
    }
  } else {
    try {
      const postlist = await Post.find({ _id: authorHearts.map((heart) => heart.postid) })
                                .sort({_id: -1})
                                .limit(15)
                                .skip((page - 1) * 15).exec()
      const lastpage = await Post.countDocuments().exec
  
      ctx.set('last-page', Math.ceil(lastpage / 10))
      ctx.body = postlist
    } catch (err) {
      ctx.throw(500, err)
    }
  }
}

exports.starPostList = async (ctx) => {

  // 파라미터 값으로 페이지값이 없을 시 page = 1, 10진법
  const page = parseInt(ctx.params.page || 1, 10)
  const author = ctx.params.author;

  if (page < 1) {
    // page가 1보다 작을 시 잘못된 요청 반환
    ctx.status = 400
    return
  }

  const { token } = ctx.header;
  let user = null;

  try{
    user = await decodeToken(token);
  } catch (err) {
  }


  const authorid = await User.findByUsername(author);
  const authorStars = await Star.find({ userid: authorid});
  
  if(user){
    try {
      // sort: _id 값 역순으로 정렬
      const Hearts = await Heart.find({ userid: user._id });
      const Stars = await Star.find({ userid: user._id });

      const postlist = await Post.find({ _id: authorStars.map((star) => star.postid) })
                                .sort({_id: -1})
                                .limit(15)
                                .skip((page - 1) * 15).exec();
      
      const newP = await Promise.all( postlist.map(async (post, index) => {
        let existHeart = Hearts.find(heart => heart.postid.toString() === post._id.toString());
          if(existHeart){
            post.hearted = true;
        }
        let existStar = Stars.find(star => star.postid.toString() === post._id.toString());
        if(existStar){
          post.stared = true;
        }
        return post;
      }));

      ctx.body = newP;
    } catch (err) {
      ctx.throw(500, err)
    }
  } else {
    try {
      const postlist = await Post.find({ _id: authorStars.map((star) => star.postid) })
                                .sort({_id: -1})
                                .limit(15)
                                .skip((page - 1) * 15).exec()
      const lastpage = await Post.countDocuments().exec
  
      ctx.set('last-page', Math.ceil(lastpage / 10))
      ctx.body = postlist
    } catch (err) {
      ctx.throw(500, err)
    }
  }
}

// 특정 포스트 글 읽기 (GET) API '/api/post/read/:id'
exports.read = async (ctx) => {
  // 파라미터로 id 값 가져오기
  const { id } = ctx.params

  const { token } = ctx.header;
  let user = null;

  try{
    user = await decodeToken(token);
  } catch (err) {
  }

  try {
    let post = await Post.findById(id).exec()

    if (!post) {
      ctx.status = 404
      return
    }

    if(user){
        const existHeart = await Heart.findOne({ userid: user._id, postid: id });
        if(existHeart){
          post.hearted = true;
        }
        const existStar = await Star.findOne({ userid: user._id, postid: id });
        if(existStar){
          post.stared = true;
        }
    }

    ctx.body = post;
  } catch (err) {
    ctx.throw(500, err)
  }
}

exports.heart = async (ctx) => {
  const { token } = ctx.header;
  const user = await decodeToken(token);

  if(!user){
    ctx.body = '유저 없음';
    ctx.throw(404);
  }

  const { postid } = ctx.request.body;

  const currentPost = await Post.findById(postid);

  if(!currentPost){
    ctx.throw(404);
  }


  const existHeart = await Heart.findOne({ userid: user._id, postid:postid });

  if(existHeart === null){
    const heart = new Heart({
      userid:user._id,
      postid
    });

    try {
      const newHeart = await heart.save();
      const newPost = await currentPost.updateHearts();
      ctx.body = newHeart;
    } catch (err) {
      ctx.throw(500, err)
    }
  } else {
    {
      ctx.body = '이미 존재함';
    }
  }
}

exports.unheart = async (ctx) => {
  const { token } = ctx.header;
  const user = await decodeToken(token);

  if(!user){
    ctx.body = '유저 없음';
    ctx.throw(404);
  }

  const { postid } = ctx.request.body;

  const currentPost = await Post.findById(postid);

  if(!currentPost){
    ctx.throw(404);
  }

  const existHeart = await Heart.findOne({ userid: user._id, postid:postid });

  if(existHeart){
    try {
      await existHeart.remove()
      const newPost = await currentPost.updateHearts();

      ctx.status = 204
    } catch (err) {
      ctx.throw(500, err)
    }
  } else {
    ctx.body = '존재하지않음'
  }
}

exports.star = async (ctx) => {
  const { token } = ctx.header;
  const user = await decodeToken(token);

  if(!user){
    ctx.body = '유저 없음';
    ctx.throw(404);
  }

  const { postid } = ctx.request.body;

  const currentPost = await Post.findById(postid);

  if(!currentPost){
    ctx.throw(404);
  }

  const existStar = await Star.findOne({ userid: user._id, postid:postid });

  if(existStar === null){
    const star = new Star({
      userid: user._id,
      postid
    });

    try {
      const newStar = await star.save()
      const newPost = await currentPost.updateStars();
      ctx.body = newStar;
    } catch (err) {
      ctx.throw(500, err)
    }
  } else {
    {
      ctx.body = '이미 존재함';
    }
  }
}

exports.unstar = async (ctx) => {
  const { token } = ctx.header;
  const user = await decodeToken(token);

  if(!user){
    ctx.body = '유저 없음';
    ctx.throw(404);
  }

  const { postid } = ctx.request.body;

  const currentPost = await Post.findById(postid);

  if(!currentPost){
    ctx.throw(404);
  }

  const existStar = await Star.findOne({ userid: user._id, postid:postid });

  if(existStar){
    try {
      await existStar.remove()

      const newPost = await currentPost.updateStars();
      ctx.status = 204
      ctx.body = '삭제됨';
    } catch (err) {
      ctx.throw(500, err)
    }
  } else {
    ctx.body = '존재하지않음'
  }
}

// 특정 게시글 수정하기 (PUT) API '/api/post/update/:id'
exports.update = async (ctx) => {
  // 게시글 사용자 비교를 위한 user
  const { user } = ctx.request
  const { id } = ctx.params

  ctx.request.body.updatedAt = Date.now()

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      ctx.request.body,
      { new: true }
    ).exec()

    if (!post) {
      ctx.status = 404
      return
    }

    // 접속한 사용자가 업거나 게시글 작성자와 다를 경우
    if (!user || user._id !== post.author.toString()) {
      ctx.status = 403
      return
    }

    ctx.body = post
  } catch (err) {
    ctx.throw(500, err)
  }
}

// 특정 게시글 삭제하기 (DELETE) API '/api/post/remove/:id'
exports.remove = async (ctx) => {
  // 게시글 사용자 비교를 위한 user
  const { token } = ctx.header;
  const user = await decodeToken(token);
  const { id } = ctx.params

  try {
    const post = await Post.findById(id).exec()

    if (!user || user._id !== post.author.toString()) {
      ctx.status = 403
      return
    }

    await Post.findByIdAndRemove(id).exec()

    ctx.status = 204
  } catch (err) {
    ctx.throw(500, err)
  }
}