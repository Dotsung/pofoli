import Router from 'koa-router'
import * as commentCtrl from './comment.ctrl';

const comment = new Router()

comment.get('/', (ctx) => {
  ctx.body = 'comment API 분기점'
})

comment.post('/write', commentCtrl.write)
comment.get('/list/:postid', commentCtrl.list)

export default comment