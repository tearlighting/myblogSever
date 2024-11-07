import { Dialect } from "sequelize"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: any
      DB_Type: Dialect
      DB_HOST: string
      DB_INSTANCE: string
    }
  }
}
