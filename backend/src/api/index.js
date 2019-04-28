import Router from 'koa-router'

// 라우터
import auth from './auth'

const api = new Router()

api.get('/', (ctx) => {
  ctx.body = 'API 분기점'
})

api.use('/auth', auth.routes())

export default api