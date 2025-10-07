import { RouterHelper } from "@/utils/routerHelper"
import { registerRouter as registerProjectRouter } from "./project"
import { registerRouter as registerProjectTranslationRouter } from "./projectTranslation"

export function registerProject(RouterHelperInstance: RouterHelper) {
  registerProjectRouter(RouterHelperInstance)
  registerProjectTranslationRouter(RouterHelperInstance)
}
