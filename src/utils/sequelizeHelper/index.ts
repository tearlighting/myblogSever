import { Attributes, InferAttributes, InitOptions, Model, ModelAttributes, Optional, Sequelize, WhereOptions, Dialect, ModelStatic } from "sequelize"
import logHelper from "../logHelper"

interface ISequelizeHelperInit {
  user: string
  password: string
  database: string
  host: string
  dialect: Dialect
}
class SequelizeHelper {
  private _sequelize: Sequelize
  private _connectedModels: Set<typeof Model> = new Set()
  private constructor({ user, password, database, host, dialect }: ISequelizeHelperInit) {
    this._sequelize = new Sequelize(database, user, password, {
      host,
      dialect,
      logging: (err) => logHelper.sqlLogger.debug(err),
    })
  }
  get instance() {
    return this._sequelize
  }
  /**
   * 默认alter: true,会改表
   * @param association
   * @param arg
   * @returns
   */
  async initModels(
    association?: (() => any) | null,
    ...arg: Array<{
      model: ModelStatic<Model<any, any>>
      attributes: ModelAttributes<
        Model,
        // 'foreign keys' are optional in Model.init as they are added by association declaration methods
        Optional<Attributes<Model>, BrandedKeysOf<Attributes<Model>, symbol>>
      >
      options: Partial<InitOptions<Model<any, any> | any>>
    }>
  ) {
    // return await Promise.all(

    arg.map(async (m) => {
      //@ts-ignore
      m.model.init(m.attributes, {
        sequelize: this._sequelize,
        ...m.options,
      })

      //   return m.model.sync({
      //     alter: true
      //   })
    })
    association && association()

    // )
    const res = await this._sequelize.sync({ alter: true }).catch(() => false)
    // association()
    if (!!res) {
      arg.forEach((m) => {
        this._connectedModels.add(m.model)
      })
    }
    return !!res
  }
  async testConnection() {
    try {
      await this._sequelize.authenticate()
      return true
    } catch (error) {
      console.error("Unable to connect to the database:", error)
      return false
    }
  }
  bulkCreate<T extends typeof Model<any, any>>(model: T, instances: Partial<InstanceType<T>>[]) {
    console.log(instances)

    //@ts-ignore
    this.hasModel(model) && model.bulkCreate(instances)
  }
  hasModel(v: typeof Model) {
    if (!this._connectedModels.has(v)) {
      console.error("please init first")
      throw ""
    }
    return true
  }

  /**
   *
   * @param model
   * @param instance
   * @returns
   * 只做记录Sequelize的数据库操作
   * 不强制使用 Service层一个ts文件只操作一个类,不混杂
   */
  insert2Model<T extends typeof Model<any, any>>(model: T, instance: Partial<InstanceType<T>>) {
    //@ts-ignore
    return this.hasModel(model) && model.create(instance).then((res) => res.toJSON())
  }
  updateModel<T extends typeof Model<any, any>>(model: T, modelInstance: { [key in keyof Attributes<InstanceType<T>>]?: Attributes<InstanceType<T>>[key] }, conditions: Partial<InstanceType<T>>) {
    //@ts-ignore

    return this.hasModel(model) && model.update(modelInstance, { where: { ...conditions } })
  }
  deleteFromModel<T extends typeof Model<any, any>>(model: T, modelInstance: InstanceType<T>) {
    return (
      this.hasModel(model) &&
      //@ts-ignore
      model.destroy({
        where: {
          ...modelInstance,
        },
      })
    )
  }

  select<T extends typeof Model<any, any>>(model: T, modelInstance: InstanceType<T>) {
    return (
      this.hasModel(model) &&
      //@ts-ignore

      model.findAll({
        where: {
          ...modelInstance,
        },
      })
    )
  }
  selectSetWhere<T extends typeof Model<any, any>>(model: T, func: () => WhereOptions<InferAttributes<InstanceType<T>>>) {
    return (
      this.hasModel(model) &&
      //@ts-ignore

      model
        .findAll({
          where: func(),
        })
        .then((res) => res.map((m) => m.toJSON()))
    )
  }
  selectPageData<T extends typeof Model<any, any>>(model: T, modelInstance: InstanceType<T>, page = 1, limit = 10) {
    return (
      this.hasModel(model) &&
      //@ts-ignore
      model
        .findAndCountAll({
          where: {
            ...modelInstance,
          },
          offset: (page - 1) * +limit,
          limit: +limit,
        })
        .then(({ rows, count }) => {
          return {
            count,
            rows: rows.map((m) => m.toJSON()),
          }
        })
    )
  }
  selectAssolationData<T extends typeof Model<any, any>>(
    model: T,
    {
      func = function () {
        return {}
      },
      includes = null,
    }: {
      func: () => WhereOptions<InferAttributes<InstanceType<T>>>
      includes: Model<any, any>[]
    }
  ) {
    return (
      this.hasModel(model) &&
      //@ts-ignore

      model
        .findAll({
          where: func(),
          ...(includes
            ? {
                include: includes,
              }
            : {}),
        })
        .then((res) => res.map((m) => m.toJSON()))
    )
  }

  static _instance: SequelizeHelper
  static getInstance(data: ISequelizeHelperInit): SequelizeHelper {
    if (this._instance) {
      return this._instance
    }
    this._instance = new SequelizeHelper(data)
    return this.getInstance(data)
  }
}

/**
 * 设置模型统一配置，在SequelizeHelper里面统一注册
 * @param param0
 * @returns
 */
function setModel<T extends Model, M extends InstanceType<ModelStatic<T>>>({
  model,
  attributes,
  options = {},
}: {
  model: ModelStatic<T>
  attributes: ModelAttributes<M, Optional<Attributes<M>, BrandedKeysOf<Attributes<M>, never>>>
  options?: Partial<InitOptions<T>>
}) {
  return {
    model,
    attributes,
    options,
  }
}
export { SequelizeHelper, setModel }
