import { RouterHelper } from "../../utils/routerHelper"
import type { Express } from "express"
import { registerLogin } from "./login"
import { registerHome } from "./home"
import { registerBlog } from "./blog"
import { registerMessage } from "./message"
import { registerProject } from "./project"
export let RouterHelperInstance: RouterHelper
export function useRouters(app: Express) {
  RouterHelperInstance = RouterHelper.Instance(app)
  registerLogin(RouterHelperInstance)
  registerHome(RouterHelperInstance)
  registerBlog(RouterHelperInstance)
  registerMessage(RouterHelperInstance)
  registerProject(RouterHelperInstance)
  // require('./loginRouter')
  // require("./whoIamI")
}
