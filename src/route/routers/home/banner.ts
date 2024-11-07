import { useRoutes } from "@/hooks/useRoutes"
import { homeServiceInstance } from "@/service/homeService"

const { registerRouter } = useRoutes({
  routerItems: [
    {
      method: "get",
      url: "/",
      canCORS: true,
      async handler() {
        return homeServiceInstance.getBanners()
      },
    },
    {
      method: "put",
      url: "/",
      canCORS: true,
      needAuth: true,
      async handler(request) {
        return homeServiceInstance.updateBanner(request.body)
      },
    },
    {
      method: "post",
      url: "/",
      canCORS: true,
      needAuth: true,
      async handler(request) {
        return homeServiceInstance.updateBanners(request.body)
      },
    },
  ],
  baseUrl: "/api/home/banner",
})

export { registerRouter }
