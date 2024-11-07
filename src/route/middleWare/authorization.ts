import type { RequestHandler } from "express"
import { RouterHelperInstance } from "../routers"
import { ForbiddenError, NotFoundError } from "@/utils/errorHelper"
import JWTHelperIns from "@/utils/jwtHelper"

export function authorizationMiddleWare(): RequestHandler {
  return function (request, response, next) {
    // console.log(request.baseUrl,request.url);
    let { baseUrl, url, method } = request
    // console.log("b:", baseUrl, "u:", url, method)

    if (!url) {
      url = "/"
    }

    const routerItem = RouterHelperInstance?.getRouterItem({ baseUrl, url, method: method as any })
    // console.log(routerItem, baseUrl, url, method)

    if (!routerItem) {
      throw new NotFoundError("path not found:" + baseUrl + url + ",method" + method)
    } else {
      if (routerItem.needAuth) {
        // console.log('needAuth');
        // console.log(request.session, request.sessionID)

        const res = JWTHelperIns.validateJwtToken(request)
        //  console.log('res>>',res);

        if (res && res.loginId) {
          request.user = res
          next()
        } else {
          throw new ForbiddenError("authorization fail,please login again")
        }
      } else {
        next()
      }
    }
  }
}
