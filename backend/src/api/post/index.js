import Router from 'koa-router'
import * as postCtrl from './post.ctrl'

const post = new Router()

post.get('/', (ctx) => {
  ctx.body = '포스트 API 분기점'
})

// 라우터
post.post('/write', postCtrl.write)
post.get('/list/:page', postCtrl.list)
post.get('/read/:id', postCtrl.read)

post.get('/userlist/:author/:page', postCtrl.userPostList);
post.get('/heartlist/:author/:page', postCtrl.heartPostList);
post.get('/starlist/:author/:page', postCtrl.starPostList);

post.post('/heart', postCtrl.heart);
post.post('/unheart', postCtrl.unheart);
post.post('/star', postCtrl.star);
post.post('/unstar', postCtrl.unstar);

post.put('/update/:id', postCtrl.update)
post.delete('/remove/:id', postCtrl.remove)

export default post 