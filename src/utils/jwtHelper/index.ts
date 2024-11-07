import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { ForbiddenError } from "../errorHelper"

enum Oath2Token {
  key = "bearer",
}

class JWTHelper {
  /**
   * add token to cookie and authorization
   * @param res
   * @param payload
   * @param maxAge ms
   */
  publish(res: Response, payload = {}, maxAge = 3600 * 24 * 1000) {
    const token = jwt.sign(payload, this._secret, {
      expiresIn: maxAge,
    })
    // res.cookie(this._cookieKey, token, {
    //   maxAge,
    //   path: "/",
    // })
    res.header("authorization", token)
    res.header("access-control-expose-headers", "Authorization")
  }
  validateJwtToken(request: Request) {
    let token: string = request.cookies ? request.cookies[this._cookieKey] : ""
    if (!token) {
      token = request.headers.authorization
    } else {
      //if token from cookie, add bearer
      token = "bearer " + token
    }

    if (!token) {
      throw new ForbiddenError("don't have token")
    }
    //处理oatu2 的 bearer
    const tokenArr = token.split(" ")
    if (tokenArr.length === 2) {
      if (tokenArr[0].toLowerCase() !== Oath2Token.key) {
        throw new Error("token format error")
      }
      token = tokenArr[1]
    }

    try {
      const res = jwt.verify(token, this._secret) as ILoginReturn
      return res
    } catch (e) {
      throw e
    }
  }
  constructor(private _secret: string, private _cookieKey: string) {}
}

const defaultSetting = {
  secret: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
  cookieKey: "token",
}

const JWTHelperIns = new JWTHelper(defaultSetting.secret, defaultSetting.cookieKey)

export default JWTHelperIns
