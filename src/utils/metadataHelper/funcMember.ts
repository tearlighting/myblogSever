import { ClassConstructor } from "class-transformer"
import { isAsyncFunction } from "node:util/types"
const interceptor = Symbol("interceptor")

export enum ENMyCustumDecorators {
  Transform = "transform",
}
/**
 *
 *会变成异步函数
 */
export function FuncMemeberInterceptorFactory({ beforePerform, performFunction, afterPerform }: IFuncMemeberInterceptorCallback = {}) {
  return function FuncMemeberInterceptor<T extends ClassConstructor<T> | Object>(target: T, key: string, description: TypedPropertyDescriptor<(...arg: any) => any>) {
    //   console.log(target, key, description);
    if (target instanceof Function) {
      target = target.prototype
    }
    const metadata: IMyCustomMetaDataType<any>[] = Reflect.getMetadata(interceptor, target, key) || []
    const temp = performFunction || description.value || description.set!
    const newFunc = async function (...arg: any[]) {
      await (beforePerform && beforePerform(metadata, arg))
      performFunction = performFunction || (temp as (...arg: any[]) => any)
      const res = await performFunction(...arg)
      await (afterPerform && afterPerform(metadata, arg))
      return res
    }
    // let newFunc: (...arg: any) => any
    // console.log(isAsyncFunction(temp), temp, (temp as any).constructor.name)

    // if (isAsyncFunction(temp)) {
    //   newFunc = async function (...arg: any[]) {
    //     await (beforePerform && beforePerform(metadata, arg))
    //     const res = await temp(...arg)
    //     await (afterPerform && afterPerform(metadata, arg))
    //     return res
    //   }
    // } else {
    //   newFunc = function (...arg: any[]) {
    //     beforePerform && beforePerform(metadata, arg)
    //     temp(...arg)
    //     afterPerform && afterPerform(metadata, arg)
    //   }
    // }

    if (description.writable) description.value = newFunc
    else description.set = newFunc
  }
}

/**
 * 自定义 记录 参数装饰器
 * 参数装饰器工厂函数
 * 通常记录参数类型
 *
 */
export function MyRecordFunctionParamsDecoratorFactory<S>(decorator: ENMyCustumDecorators, target?: S) {
  /**
   * 参数装饰器
   * @param  object prototype
   * @param  propertyName 属性名/函数名
   * @param index 参数index
   * 将想要转换的类型挂在prototype上
   */
  return function <T>(object: ClassConstructor<T> | Object, propertyName: string, index: number) {
    // console.log(propertyName, index)

    if (object instanceof Function) {
      object = object.prototype
    }
    let value: Array<IMyCustomMetaDataType<any>> = Reflect.getOwnMetadata(interceptor, object, propertyName) || []
    const item: IMyCustomMetaDataType<any> = {
      index,
      target: target,
      decorator,
    }
    value = ArrayAddOrder(value, item, ({ index: index1 }, { index: index2 }) => index1 > index2)
    // console.log(value)
    Reflect.defineMetadata(interceptor, value, object, propertyName)
  }
}
/**
 * 添加为数组按规则顺序指定位置添加项
 */
function ArrayAddOrder<T>(targetArr: T[], addItem: T, rule?: (item: T, add: T) => boolean, config?: Partial<{ deep: boolean }>): T[]
function ArrayAddOrder<T>(targetArr: T[], addItem: T[], rule?: (item: T, add: T) => boolean, config?: Partial<{ deep: boolean }>): T[]
function ArrayAddOrder<T>(targetArr: T[], addItem: T | T[], rule?: (item: T, add: T) => boolean, config?: Partial<{ deep: boolean }>) {
  const target = config && config.deep ? deepClone(targetArr) : targetArr
  if (!(addItem instanceof Array)) {
    addItem = [addItem]
  }
  addItem.forEach((item) => {
    const index = target.findIndex((i) => (rule && rule(i, item)) || i > item)
    target.splice(index - 1, 0, item)
  })
  return target
}
function deepClone<T>(source: T): T {
  let newObj: any
  if (!source || typeof source !== "object") {
    newObj = source
  } else {
    if (Array.isArray(source)) {
      const tmpArr: any[] = []
      for (let item of source) {
        tmpArr.push(deepClone(item))
      }
      newObj = tmpArr
    } else {
      const tmpObj: Record<string, any> = {}
      for (let key in source) {
        tmpObj[key] = deepClone(source[key])
      }
      newObj = tmpObj
    }
  }
  return newObj
}
