import { RouterHelper } from "@/utils/routerHelper"
import { registerRouter as blogRegisterRouter } from "./blog"
import { registerRouter as blogTypeRegisterRouter } from "./blogType"

function registerBlog(RouterHelperInstance: RouterHelper) {
  blogTypeRegisterRouter(RouterHelperInstance)
  blogRegisterRouter(RouterHelperInstance)
}

export { registerBlog }
