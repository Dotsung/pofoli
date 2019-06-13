import Router from 'koa-router'
import * as profileCtrl from './profile.ctrl'

const profile = new Router()

profile.get('/', (ctx) => {
  ctx.body = 'Profile 분기점'
});

profile.post('/heart', profileCtrl.heart);
profile.post('/unheart', profileCtrl.unheart);
profile.post('/star', profileCtrl.star);
profile.post('/unstar', profileCtrl.unstar);

// auth.post('/register/local', authCtrl.localRegister);
// auth.post('/login/local', authCtrl.localLogin);
// auth.post('/heart', authCtrl.heart);
// auth.get('/exists/:key(email|username)/:value', authCtrl.exists);
// auth.get('/check', authCtrl.check);
// auth.get('/finduser/:id', authCtrl.findUser);

export default profile