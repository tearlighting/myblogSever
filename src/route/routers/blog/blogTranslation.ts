import { useRoutes } from "@/hooks/useRoutes"
import { blogTranslationServiceInstance } from "@/service/blogService"

const { registerRouter } = useRoutes({
  routerItems: [
    {
      method: "post",
      url: "/",
      async handler(request) {
        return blogTranslationServiceInstance.createBlogTranslation(request.body)
      },
      canCORS: true,
      needAuth: true,
    },
    {
      method: "put",
      url: "/",
      async handler(request) {
        return blogTranslationServiceInstance.updateBlogTranslation(request.body)
      },
      canCORS: true,
      needAuth: true,
    },
  ],
  baseUrl: "/api/blog/blogTranslation",
})

export { registerRouter }
