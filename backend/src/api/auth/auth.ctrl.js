import User from 'models/User';
import Joi from 'joi';

import { decodeToken } from 'jwt/jwt_token';
import uploadFile from 's3/uploadFile';


// 회원가입 (POST) API '/api/auth/register'
export const localRegister = async (ctx) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    username: Joi.string()
      .alphanum()
      .min(4)
      .max(15)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  // 스키마 검증 실패
  if (result.error) {
    ctx.status = 400; // 잘못된 요청
    return;
  }

  let existing = null;

  try {
    existing = await User.findByEmailOrUsername(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }

  if (existing) {
    ctx.status = 409; // 충돌
    ctx.body = {
      key: existing.email === ctx.request.body.email ? 'email' : 'username'
    };
    return;
  }

  // 사용자 계정 생성
  let user = null;

  try {
    user = await User.localRegister(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = user;
};

// 로그인 (POST) API '/api/auth/login'
export const localLogin = async (ctx) => {
  // 데이터 검증
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    // 400: 잘못된 요청
    ctx.status = 400;
    return;
  }

  // email, password를 리퀘스트에서 받아옴
  const { email, password } = ctx.request.body;

  let user = null;

  try {
    user = await User.findByEmail(email);
  } catch (err) {
    ctx.throw(500, err);
  }

  // 사용자 해싱 비밀번호 비교(모델 메소드)
  if (!user || !user.validatePassword(password)) {
    // 403: 권한없음
    ctx.status = 403;
    return;
  }

  // 토큰 생성 및 쿠키에 저장
  let token = null;

  try {
    token = await user.generateToken();
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = { "token": token };
};

export const exists = async (ctx) => {
  const { key, value } = ctx.params;
  let user = null;

  try {
      // key 에 따라 findByEmail 혹은 findByUsername 을 실행합니다.
      user = await (key === 'email' ? User.findByEmail(value) : User.findByUsername(value));
  } catch (e) {
      ctx.throw(500, e);
  }

  ctx.body = {
      exists: user !== null
  };
}

// 사용자 접속 확인 (GET) API '/api/auth/check'
export const check = async (ctx) => {
  const { token } = ctx.header;
  const user = await decodeToken(token);

  if (!user) {
    ctx.body = "";
    return;
  }

  let currentUser = null
  try {
    currentUser = await User.findById(user)
  } catch (err) {
    ctx.throw(500, err)
  }

  if (!currentUser) {
    ctx.status = 403  // 권한 없음
    return;
  }

  ctx.body = currentUser;
};

export const findUser = async (ctx) => {
  const { username } = ctx.params;
  let user = null;

  try{
    user = await User.findByUsername(username);
  } catch(e) {
    ctx.throw(500, e);
  }

  ctx.body = {
    thumbnail: user.profile.thumbnail,
    username: user.profile.username
  }
};