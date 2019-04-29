import Router from 'koa-router'
import postCtrl from './post.ctrl'

const post = new Router()

post.get('/', (ctx) => {
  ctx.body = '포스트 API 분기점'
})

// 라우터
post.post('/write', postCtrl.write)
post.get('/list', postCtrl.list)
post.get('/read/:id', postCtrl.read)

export default post 