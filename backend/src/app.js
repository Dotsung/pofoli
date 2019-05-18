import { config } from 'dotenv'

// Koa Server 모듈
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import morgan from 'koa-morgan'
import cors from '@koa/cors';
var koaBody = require('koa-body');

// api 불러오기
import api from './api';

// MongoDB 모듈
import mongoose from 'mongoose'

// Dotenv 설정파일 사용 (/.env)
config()

// 서버, 라우터, Process.env 레퍼런스 작성
const app = new Koa()
const router = new Router()

app.use(cors());

const { PORT: port=4000, MONGO_URI: mongoURI } = process.env

// MongoDB NodeJS 프라미스 사용 선언
mongoose.Promise = global.Promise

// Database 세팅
mongoose.connect(mongoURI, { useNewUrlParser: true })
.then(() => console.log('mongodb connected'))
.catch((err) => console.error(err.stack))


app.use(koaBody({ multipart: true }));
// app.use(bodyParser());

router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정


// 미들웨어
app.use(morgan('dev'))
.use(router.routes())
.use(router.allowedMethods())

// Server Listening
app.listen(port, () => console.log(`Koa Server On ${port} PORT!!`))