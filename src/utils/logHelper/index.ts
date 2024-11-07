import log, { getLogger } from "log4js"
import path from "path"

log.configure({
  appenders: {
    sql: {
      type: "dateFile",
      filename: path.resolve(__dirname, "../../../logs", "sql", "logs.log"),
      layout: {
        type: "pattern",
        pattern: "%c [%d{yyyy-MM-dd hh:mm:ss}] [%p] %m %n",
      },
      keepFileExt: true,
    },
    default: {
      type: "stdout",
      //   filename: path.resolve(__dirname, "logs", "default", "logs.log"),
      //   keepFileExt: true
    },
  },
  categories: {
    sql: {
      appenders: ["sql"],
      level: "all",
    },
    default: {
      appenders: ["default"],
      level: "all",
    },
  },
})

process.on("exit", () => {
  log.shutdown()
})

export default {
  sqlLogger: getLogger("sql"),
  logger: getLogger("default"),
}
