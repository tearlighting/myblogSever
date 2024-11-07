import express, { Router } from "express"
import { EPort } from "./config"
// import session from 'express-session'
import { authorizationMiddleWare } from "./middleWare/authorization"
import cookieParser from "cookie-parser"

import { useRouters } from "./routers"
import { errorHandler } from "./middleWare/errorhandler"
import path from "node:path"
import cors from "./middleWare/cors"
import session from "express-session"
import "express-async-errors"
const serverApp = express()

serverApp.use(cors())

serverApp.use(cookieParser())

serverApp.use("/static", express.static(path.resolve(__dirname, "../../client")))

// const r = express.Router()
// r.get("/api/blog", (request, response, next) => {
//   console.log(request.url, request)
//   next()
// })
// serverApp.use(r)
serverApp.use(authorizationMiddleWare())
/**
 * captcha的结果存在session里面
 * todo 假设客户端非浏览器环境，没有cookie
 */
serverApp.use(
  session({
    secret: "frm8bm4uoeh3og9r",
    //  Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
    cookie: {
      maxAge: 1000 * 60 * 10000,
      httpOnly: true,
    },
    name: "captchaSession",
    resave: true,
    saveUninitialized: true,
  })
)

serverApp.use(express.urlencoded({ extended: true }))

serverApp.use(express.json())

useRouters(serverApp)

serverApp.use(errorHandler())

serverApp.listen(EPort.Port, () => {
  console.log(`listen port:${EPort.Port} success`)
})
