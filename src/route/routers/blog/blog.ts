import { useRoutes } from "@/hooks/useRoutes"
import { blogServiceInstance } from "@/service/blogService"
import { Request, Response } from "express"

const { registerRouter } = useRoutes({
  routerItems: [
    {
      method: "get",
      url: "/",
      async handler(request) {
        return blogServiceInstance.getBlogsPagenation(request.query as any)
      },
      canCORS: true,
    },
    {
      method: "post",
      url: "/",
      async handler(request) {
        return blogServiceInstance.addBlog(request.body)
      },
      canCORS: true,
      needAuth: true,
    },
    {
      method: "put",
      url: "/",
      async handler(request) {
        return blogServiceInstance.updateBlog(request.body)
      },
      canCORS: true,
      needAuth: true,
    },
    {
      method: "delete",
      url: "/",
      async handler(request) {
        return blogServiceInstance.deleteBlog(request.body)
      },
      canCORS: true,
      needAuth: true,
    },
    {
      method: "get",
      url: "/detail/:id",
      async handler(request) {
        console.log(request.params, request.query)
        return blogServiceInstance.getBlogById({ ...request.params, ...request.query } as any)
      },
      canCORS: true,
    },
  ],
  baseUrl: "/api/blog",
})

export { registerRouter }
