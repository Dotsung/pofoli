import Router from 'koa-router'
import * as authCtrl from './auth.ctrl'

const auth = new Router()

auth.get('/', (ctx) => {
  ctx.body = 'Auth 분기점'
});

auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.get('/exists/:key(email|username)/:value', authCtrl.exists);
auth.get('/check', authCtrl.check);
auth.get('/finduser/:id', authCtrl.findUser);

export default auth