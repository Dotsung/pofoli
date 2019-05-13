import Router from 'koa-router'

// 라우터
import auth from './auth'
import post from './post'

const api = new Router()

api.get('/', (ctx) => {
  ctx.body = 'API 분기점'
})

api.use('/auth', auth.routes())
api.use('/post', post.routes())

export default api