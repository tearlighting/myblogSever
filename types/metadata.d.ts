declare enum ENMyCustumDecorators {
  Transform = "transform",
}
interface IMyCustomMetaDataType<T> {
  index: number
  /**
   * 想要记录的参数信息
   */
  target?: T
  /**
   * 本系统已定义的拦截类型
   */
  decorator: ENMyCustumDecorators
}

interface IFuncMemeberInterceptorCallback {
  beforePerform?: IMyValidataCallback<any>
  performFunction?: any
  afterPerform?: IMyValidataCallback<any>
}
interface IMyValidataCallback<T> {
  /**
   * @param metadata 当前类的上挂载的关于该方法的metaData
   * @param 当前函数的参数列表
   */
  (metadata: Array<IMyCustomMetaDataType<T>>, arg: any[]): Promise<any[]> | any[] | void
}
