import Router from 'koa-router'
import * as profileCtrl from './profile.ctrl'

const profile = new Router()

profile.get('/', (ctx) => {
  ctx.body = 'Profile 분기점'
});

profile.get('/get/:username', profileCtrl.getProfile);
profile.post('/updatethumbnail', profileCtrl.updateUserThumbnail);
profile.post('/updateinfo', profileCtrl.updateUserInfo);

export default profile