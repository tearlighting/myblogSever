import { ValidateError } from "@/utils/errorHelper"
import { MyRecordFunctionParamsDecoratorFactory, FuncMemeberInterceptorFactory, ENMyCustumDecorators } from "@/utils/metadataHelper/funcMember"
import { ClassConstructor, plainToInstance } from "class-transformer"
import { validate, validateSync, ValidatorOptions } from "class-validator"

export function useClassFunIntercepter() {
  function ParamType<T extends ClassConstructor<any>>(type: T) {
    return MyRecordFunctionParamsDecoratorFactory(ENMyCustumDecorators.Transform, type)
  }
  /**
   * 同步函数小心，会变成异步函数，不过应该也没有事，都是同步也行
   * 设置默认值运行前验证数据
   */
  const FuncIntercepter = function ({ beforePerform, performFunction, afterPerform }: IFuncMemeberInterceptorCallback = {}, options: ValidatorOptions = {}) {
    beforePerform =
      beforePerform ||
      function (m, arg) {
        // console.log(m, arg)

        arg.every((v, index) => {
          return m
            .filter((meta) => meta.index === index)
            .every((meta) => {
              //   console.log(plainToInstance(meta.target, v))

              const res = validateSync(plainToInstance(meta.target, v), options)
              if (res.length) {
                throw new ValidateError(Object.values(res[0].constraints).join(","))
              }
              return true
            })
        })
      }
    return FuncMemeberInterceptorFactory({ beforePerform, performFunction, afterPerform })
  }
  return {
    FuncIntercepter,
    ParamType,
  }
}

const { ParamType, FuncIntercepter } = useClassFunIntercepter()

export { ParamType, FuncIntercepter }
