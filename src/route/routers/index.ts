import type { Express } from "express"

import { RouterHelper } from "../../utils/routerHelper"
import { registerBlog } from "./blog"
import { registerHome } from "./home"
import { registerLogin } from "./login"
import { registerMessage } from "./message"
import { registerProject } from "./project"
import { registerUpload } from "./upload"

export let RouterHelperInstance: RouterHelper
export function useRouters(app: Express) {
  RouterHelperInstance = RouterHelper.Instance(app)
  registerLogin(RouterHelperInstance)
  registerHome(RouterHelperInstance)
  registerBlog(RouterHelperInstance)
  registerMessage(RouterHelperInstance)
  registerProject(RouterHelperInstance)
  registerUpload(RouterHelperInstance)
  // require('./loginRouter')
  // require("./whoIamI")
}
