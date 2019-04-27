import { config } from 'dotenv'

// Koa Server 모듈
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import morgan from 'koa-morgan'

// MongoDB 모듈
import mongoose from 'mongoose'

// Dotenv 설정파일 사용 (/.env)
config()

// 서버, 라우터, Process.env 레퍼런스 작성
const app = new Koa()
const router = new Router()
const { PORT: port=4000, MONGO_URI: mongoURI } = process.env

// MongoDB NodeJS 프라미스 사용 선언
mongoose.Promise = global.Promise

// Database 세팅
mongoose.connect(mongoURI, { useNewUrlParser: true })
.then(() => console.log('mongodb connected'))
.catch((err) => console.error(err.stack))

// 미들웨어
app.use(morgan('dev'))
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods())

router.get('/', (ctx) => {
  ctx.body = '루트 경로 테스트'
})

// Server Listening
app.listen(port, () => console.log(`Koa Server On ${port} PORT!!`))