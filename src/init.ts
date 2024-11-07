import "reflect-metadata"
import { config } from "dotenv"
import { isAsyncFunction } from "node:util/types"

//init env
config()

import "./dao"
import "./route"
