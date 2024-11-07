import { useRoutes } from "@/hooks/useRoutes"
import { projectServiceInstance } from "@/service/projectService"

import { Request, Response } from "express"

const { registerRouter } = useRoutes({
  routerItems: [
    {
      method: "get",
      url: "/",
      async handler(request) {
        // console.log(request.query)

        return projectServiceInstance.getProjectsPagenation(request.query as any)
      },
      canCORS: true,
    },
    {
      method: "post",
      url: "/",
      async handler(request) {
        return projectServiceInstance.addProject(request.body)
      },
      canCORS: true,
      //   needAuth: true
    },
    {
      method: "get",
      url: "/detail/:id",
      async handler(request) {
        console.log(request.params, request.query)
        return projectServiceInstance.getBlogById({ ...request.params, ...request.query } as any)
      },
      canCORS: true,
    },
  ],
  baseUrl: "/api/project",
})

export { registerRouter }
