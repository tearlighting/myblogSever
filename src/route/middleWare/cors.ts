import { RequestHandler } from "express"
import { RouterHelperInstance } from "../routers"

const whiteList = ["http://127.0.0.1:5500", "http://localhost:5500", "http://localhost:8080"]

export default function (): RequestHandler<any, any, any, any, Record<string, any>> {
  return function (request, response, next) {
    if ("origin" in request.headers) {
      let { method, path, baseUrl } = request
      if (method.toUpperCase() === "OPTIONS") {
        method = request.headers["access-control-request-method"]
      }

      const currentRouter = RouterHelperInstance.getRouterItem({
        baseUrl,
        method: method as any,
        url: path,
      })
      //   console.log(currentRouter, method, path, baseUrl)

      if (currentRouter?.canCORS && whiteList.includes(request.headers.origin)) {
        // console.log("设置允许跨域信息")

        //1.简单请求 添加 access-control-allow-origin
        if (typeof request.headers.origin !== "undefined") {
          response.header("access-control-allow-origin", request.headers.origin)
          //   console.log(response.getHeaders())
        }
        // console.log(request.method, request.url)
        //2. 预检请求
        if (request.method.toUpperCase() === "OPTIONS") {
          response.header("access-control-allow-headers", request.headers["access-control-request-headers"])
          response.header("access-control-allow-methods", request.headers["access-control-request-method"])
          //未来多少秒内不要发预检了
          response.header("access-control-max-age", "3600")
          //   response.end()

          //   return
        }
        // console.log(request.headers)

        //3.带身份凭证
        // request.headers['access-control-allow-credentials']
        response.header("access-control-allow-credentials", "true")
      }

      if (request.method.toUpperCase() === "OPTIONS") {
        return response.status(200).end()
      }
    }
    // console.log(request.cookies, request.session)

    next()
  }
}
