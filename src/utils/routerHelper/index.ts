import type { Express, Router, RequestHandler } from "express"
import path from "path"
import { pathToRegexp } from "path-to-regexp"
import { response2Client } from "../responseHelper"

export class RouterHelper {
  /**
   * all routes
   */
  private _routerCache: Record<string, IRouterItem[]> = {}
  private constructor(private _app: Express) {}
  registerRouter(baseUrl: string, router: Router, routerItems: IRouterItem[]) {
    try {
      if (this._routerCache[baseUrl]) {
        throw new Error("this baseUrl has been used>>>" + baseUrl)
      }
      this.addRouters(router, routerItems)
      this._app.use(baseUrl, router)
      this._routerCache[baseUrl] = routerItems
    } catch (e) {
      console.log(e)
    }
  }
  private addRouters(router: Router, routerItems: IRouterItem[]) {
    routerItems.forEach((item) => {
      router[item.method](item.url, response2Client(item.handler))
    })
  }
  /**
   *
   * @param param0
   * @returns
   * get current route config
   *
   */
  getRouterItem<T extends { baseUrl: string; url: string; method: Method }>({ baseUrl, url, method }: T) {
    // console.log(this._routerCache)

    for (let baseurl in this._routerCache) {
      for (let item of this._routerCache[baseurl]) {
        if (method.toUpperCase() === item.method.toUpperCase() && pathToRegexp(handlePathEnd(baseurl + item.url)).test((baseUrl + url).split("?")[0])) return item
      }
    }
  }

  private static _instance: RouterHelper
  static Instance(app: Express): RouterHelper {
    if (this._instance) {
      return this._instance
    } else {
      this._instance = new RouterHelper(app)
      return this.Instance(app)
    }
  }
}

/**
 * 处理路径类似 /login/ 与 /login 冲突问题
 * @param path
 * @returns
 */
function handlePathEnd(path: string) {
  if (path.slice(-1) === "/") {
    return handlePathEnd(path.slice(0, path.length - 1))
  }
  return path
}
