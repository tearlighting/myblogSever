import { RouterHelper } from "@/utils/routerHelper"
import { registerRouter as messageRegisterRouter } from "./message"
import { registerRouter as commentRegisterRouter } from "./comment"

export function registerMessage(instance: RouterHelper) {
  messageRegisterRouter(instance)
  commentRegisterRouter(instance)
}
