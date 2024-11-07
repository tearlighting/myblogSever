import { getResponseData, getResponseErrorData } from "@/utils/responseHelper"
import { ErrorRequestHandler } from "express"

export function errorHandler(): ErrorRequestHandler {
  return function (err, request, response, next) {
    // console.log("err",getResponseErrorData(err));
    // console.log("err>>", err)
    const { message, code } = getResponseErrorData(err)
    response.status(code).send({ message, code })
  }
}
