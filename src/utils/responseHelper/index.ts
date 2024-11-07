import type { Express, Router, RequestHandler } from "express"
import { SeviceError } from "../errorHelper"
import { useResponseData2File } from "@/hooks/useResponseData2File"

const { write2File } = useResponseData2File()
/**
 * 正确返回格式
 * format data if success
 * @param data
 * @param code
 * @returns
 */
export function getResponseData<T>(data: T, code = 200) {
  const res: IResponseData<T> = {
    code,
    data,
  }
  return res
}
/**
 *  format data if Error
 * @param err
 * @returns
 */
export function getResponseErrorData(err: SeviceError) {
  let message: string
  let code = 500
  if (err instanceof SeviceError) {
    code = +err.code
    message = err.message
  } else {
    message = err as any
  }
  const res: IResponseData<any> = {
    code,
    message,
  }
  return res
}

/**
 * response method,it can response data that func return
 * 套了一层，配置路由时不用关心如何返回数据
 * @param func
 * @returns
 */
export const response2Client = (func: IRouterItem["handler"]): RequestHandler => {
  return async function (request, response, next) {
    try {
      const res = await func(request, response)
      // console.log(res, getResponseData(res), response.headersSent)
      const responseData = getResponseData(res)

      response.send(responseData)
      write2File({ data: responseData, description: request.url })
    } catch (err) {
      //   console.log(err)

      next(err)
    }
  }
}
