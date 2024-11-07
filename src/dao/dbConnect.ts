import { SequelizeHelper } from "@/utils/sequelizeHelper"

const sequelizeHelperInstance = SequelizeHelper.getInstance({
  ...(require("./config.json") as Record<"user" | "password", string>),
  database: process.env.DB_NAME,
  dialect: process.env.DB_Type,
  host: process.env.DB_HOST,
})

sequelizeHelperInstance.testConnection().then(() => {
  console.log("db connect success")
})

export { sequelizeHelperInstance }
