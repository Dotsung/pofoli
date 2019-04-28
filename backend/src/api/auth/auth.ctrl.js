import User from 'models/User'
import Joi from 'joi'

// 회원가입 (POST) API '/api/auth/register'
exports.register = async (ctx) => {
    const data = Joi.object().keys({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().min(6).required()
    })
  
    const result = Joi.validate(ctx.request.body, data)
  
    if (result.error) {
      ctx.status = 400  // 잘못된 요청
      return
    }
  
    let existing = null
  
    try {
      existing = await User.findByEmail(ctx.request.body.email)
    } catch (err) {
      ctx.throw(500, err)
    }
  
    if (existing) {
      ctx.status = 409  // 충돌
      ctx.body = '중복 이메일 주소'
      return
    }
  
    // 사용자 계정 생성
    let user = null
  
    try {
      user = await User.register(ctx.request.body)
    } catch (err) {
      ctx.throw(500, err)
    }
  
    ctx.body = user
}

// 로그인 (POST) API '/api/auth/login'
exports.login = async (ctx) => {

}

// 로그아웃 (POST) API '/api/auth/logout'
exports.logout = async (ctx) => {

}

// 사용자 접속 확인 (GET) API '/api/auth/check'
exports.check = (ctx) => {
  
}