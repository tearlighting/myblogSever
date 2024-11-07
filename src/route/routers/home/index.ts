import { RouterHelper } from "@/utils/routerHelper"
import { registerRouter as bannerRegisterRouter } from "./banner"
export function registerHome(RouterHelperInstance: RouterHelper) {
  bannerRegisterRouter(RouterHelperInstance)
}
