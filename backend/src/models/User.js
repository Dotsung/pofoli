import mongoose from 'mongoose'
import crypto from 'crypto'

// JWT 토큰생성 함수
import { generateToken } from 'jwt/jwt_token'

const User = new mongoose.Schema({
  profile: {
    username: String,
    Introduction: String,
    thumbnail: { type: String, default: 'testimg/bonobono.png' },
    hearts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    stars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  email: String,
  social: {
    facebook: {
        id: String,
        accessToken: String
    },
    twitter: {
      id: String,
      accessToken: String
    },
    google: {
        id: String,
        accessToken: String
    }
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

function hash (password) {
    return crypto.createHmac(
      'sha256',
      process.env.SECRET_KEY
    ).update(password).digest('hex')
}

User.statics.findByEmail = function (email) {
    return this.findOne({ email }).exec()
  }
  
  // 사용자 등록 메소드
  User.statics.register = function ({ username, email, password }) {
    const user = new this({
      username, email,
      password: hash(password)
    })
    return user.save()
  }
  
  // 비밀번호 비교 메소드
  User.methods.validatePassword = function (password) {
    const contrast = hash(password)
  
    return this.password === contrast
  }
  
  // jwt payload로 토큰 발행
  User.methods.generateToken = function () {
    const payload = {
      _id: this._id,
      email: this.email
    }
    return generateToken(payload, 'User')
  }
  
  export default mongoose.model('User', User)