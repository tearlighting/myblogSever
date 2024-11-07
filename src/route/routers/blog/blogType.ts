import { useRoutes } from "@/hooks/useRoutes"
import { blogTypeServiceInstance } from "@/service/blogService"

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
        console.log(request.body)

        return blogTypeServiceInstance.updateBlogTypes(request.body)
      },
      canCORS: true,
      //   needAuth: true,
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
  ],
  baseUrl: "/api/blog/blogType",
})

export { registerRouter }
