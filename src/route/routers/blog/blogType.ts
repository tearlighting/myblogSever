import { useRoutes } from "@/hooks/useRoutes"
import { blogTypeServiceInstance } from "@/service"

const { registerRouter } = useRoutes({
  routerItems: [
    {
      method: "get",
      url: "/",
      async handler() {
        return blogTypeServiceInstance.getBlogTypes()
      },
      canCORS: true,
    },
    {
      method: "post",
      url: "/",
      async handler(request) {
        return blogTypeServiceInstance.updateBlogTypes(request.body)
      },
      canCORS: true,
      needAuth: true,
    },
    {
      method: "put",
      url: "/",
      async handler(request) {
        return blogTypeServiceInstance.updateBlogType(request.body)
      },
      canCORS: true,
      needAuth: true,
    },
    {
      method: "delete",
      url: "/",
      async handler(request) {
        return blogTypeServiceInstance.deleteBlogType(request.body)
      },
    },
  ],
  baseUrl: "/api/blog/blogType",
})

export { registerRouter }
