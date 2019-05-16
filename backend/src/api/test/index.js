import Router from 'koa-router'
import * as testCtrl from './test.ctrl'

const test = new Router()

test.get('/', (ctx) => {
  ctx.body = 'test API 분기점'
});

// 라우터
test.post('/save', testCtrl.save)

export default test 