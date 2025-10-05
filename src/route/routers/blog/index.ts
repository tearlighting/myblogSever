import { RouterHelper } from "@/utils/routerHelper"
import { registerRouter as blogRegisterRouter } from "./blog"
import { registerRouter as blogTypeRegisterRouter } from "./blogType"
import { registerRouter as blogTranslationRegisterRouter } from "./blogTranslation"

function registerBlog(RouterHelperInstance: RouterHelper) {
  blogTypeRegisterRouter(RouterHelperInstance)
  blogRegisterRouter(RouterHelperInstance)
  blogTranslationRegisterRouter(RouterHelperInstance)
}

export { registerBlog }
