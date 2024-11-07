import { useRoutes } from "@/hooks/useRoutes"
import express from "express"

const router = express.Router()

const routerItems: IRouterItem[] = [
  {
    method: "get",
    url: "/",
    //能到这边说明token本身没用问题
    async handler(request, response) {
      // console.log('who');

      const { loginId, name, role } = request.user
      return {
        loginId,
        name,
        role,
      }
    },
    needAuth: true,
    canCORS: true,
  },
]

const { registerRouter } = useRoutes({
  routerItems,
  baseUrl: "/api/whoAmI",
})

export { registerRouter }
