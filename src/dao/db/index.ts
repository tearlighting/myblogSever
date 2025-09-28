import { SequelizeHelper } from "./SequelizeHelper"
export const dbIns = SequelizeHelper.createInstance({
  ...(require("./config.json") as Record<"user" | "password", string>),
  database: process.env.DB_NAME,
  dialect: process.env.DB_Type,
  host: process.env.DB_HOST,
})
