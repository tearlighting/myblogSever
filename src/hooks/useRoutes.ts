import { RouterHelper } from "@/utils/routerHelper"
import express, { Router } from "express"

export function useRoutes({ router = express.Router(), routerItems, baseUrl }: { router?: Router; routerItems: IRouterItem[]; baseUrl: string }) {
  function registerRouter(RouterHelperInstance: RouterHelper) {
    RouterHelperInstance.registerRouter(baseUrl, router, routerItems)
  }

  return {
    registerRouter,
  }
}
