import { Request, Response } from "express"

declare global {
  /**
   * request method
   */
  type Method = "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head"

  /**
   * base route config
   */
  interface IRouterItem {
    method: Method
    url: string
    handler: (request: Request, response: Response) => Promise<any>
    needAuth?: boolean
    canCORS?: boolean
  }

  /**
   * response data format
   */
  interface IResponseData<T> {
    code: number
    message?: string
    data?: T
  }
}
