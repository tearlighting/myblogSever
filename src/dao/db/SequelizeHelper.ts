import logHelper from "@/utils/logHelper"
import { Dialect, Model, ModelStatic, Sequelize } from "sequelize"
interface ISequelizeHelperInit {
  user: string
  password: string
  database: string
  host: string
  dialect: Dialect
}
export class SequelizeHelper {
  private static _instance: SequelizeHelper
  private _sequelize: Sequelize
  private _models: ModelStatic<Model>[] = []

  private constructor({ user, password, database, host, dialect }: ISequelizeHelperInit) {
    this._sequelize = new Sequelize(database, user, password, {
      host,
      dialect,
      logging: (err) => logHelper.sqlLogger.debug(err),
    })
  }

  get sequelize() {
    return this._sequelize
  }

  addModel(model: ModelStatic<Model>) {
    this._models.push(model)
    return this
  }

  async sync() {
    await this._sequelize.sync({ alter: true })
    console.log("✅ All models synchronized")
  }
  async testConnection() {
    try {
      await this._sequelize.authenticate()
      console.log("✅ Connection has been established successfully.")
    } catch (error) {
      console.error("Unable to connect to the database:", error)
      throw error
    }
  }
  static createInstance(data: ISequelizeHelperInit): SequelizeHelper {
    if (this._instance) {
      return this._instance
    }
    this._instance = new SequelizeHelper(data)
    return this.createInstance(data)
  }
}
