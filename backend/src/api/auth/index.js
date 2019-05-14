import Router from 'koa-router'
import authCtrl from './auth.ctrl'

const auth = new Router()

auth.get('/', (ctx) => {
  ctx.body = 'Auth 분기점'
})


auth.post('/register', authCtrl.register)
auth.post('/login', authCtrl.login)
auth.post('/logout', authCtrl.logout)
auth.get('/check', authCtrl.check)

export default auth