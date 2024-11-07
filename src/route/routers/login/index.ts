import { RouterHelper } from "@/utils/routerHelper"
import { registerRouter as registerLoginRouter } from "./loginRouter"
import { registerRouter as registerUserRouter } from "./userRouter"
import { registerRouter as registerWhoAmIRouter } from "./whoAmIRouter"
import { registerRouter as registerCaptchRouter } from "./captchRouter"
export function registerLogin(RouterHelperInstance: RouterHelper) {
  registerLoginRouter(RouterHelperInstance)
  registerUserRouter(RouterHelperInstance)
  registerWhoAmIRouter(RouterHelperInstance)
  registerCaptchRouter(RouterHelperInstance)
}
