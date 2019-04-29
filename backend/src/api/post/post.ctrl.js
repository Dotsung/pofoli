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