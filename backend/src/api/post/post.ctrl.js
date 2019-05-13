import Post from 'models/Post'
import User from 'models/User'
import Joi from 'joi'

// 포스트 작성 (POST) API '/api/post/write'
exports.write = async (ctx) => {
  // 사용자 로그인 상태 확인
  const { user } = ctx.request

  if (!user) {
    ctx.status = 403  // 권한 없음
    ctx.body = 'NO'
    return
  }

  // 입력값 검증
  const data = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required()
  })

  const result = Joi.validate(ctx.request.body, data)

  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }

  // 현재 접속자 정보
  let currentUser = null

  try {
    currentUser = await User.findById(user).exec()
  } catch (err) {
    ctx.throw(500, err)
  }

  // 데이터베이스에 저장할 정보
  const { title, body } = ctx.request.body
  const author = ctx.request.user
  const name = currentUser.username

  // 새 글 작성
  const post = new Post({
    title, body, author, name
  })

  try {
    await post.save()

    ctx.body = post
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

  try {
    // sort: _id 값 역순으로 정렬
    const postlist = await Post.find()
                              .sort({_id: -1})
                              .limit(5)
                              .skip((page - 1) * 5).exec()
    const lastpage = await Post.countDocuments().exec

    ctx.set('last-page', Math.ceil(lastpage / 10))
    ctx.body = postlist
  } catch (err) {
    ctx.throw(500, err)
  }
}

// 특정 포스트 글 읽기 (GET) API '/api/post/read/:id'
exports.read = async (ctx) => {
  // 파라미터로 id 값 가져오기
  const { id } = ctx.params

  try {
    const post = await Post.findById(id).exec()

    if (!post) {
      ctx.status = 404
      return
    }

    ctx.body = post
  } catch (err) {
    ctx.throw(500, err)
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
  const { user } = ctx.request
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