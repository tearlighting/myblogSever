import { useRoutes } from "@/hooks/useRoutes"
import { projectServiceInstance } from "@/service"

const { registerRouter } = useRoutes({
  routerItems: [
    {
      method: "get",
      url: "/",
      async handler(request) {
        return projectServiceInstance.getProjectsPagenation(request.query as any)
      },
      canCORS: true,
    },
    {
      method: "post",
      url: "/",
      async handler(request) {
        return projectServiceInstance.createProject(request.body)
      },
      canCORS: true,
      needAuth: true,
    },
    {
      method: "put",
      url: "/",
      async handler(request) {
        return projectServiceInstance.updateProject(request.body)
      },
    },
    {
      method: "get",
      url: "/detail/:id",
      async handler(request) {
        console.log(request.params, request.query)
        return projectServiceInstance.getProjectById({ ...request.params, ...request.query } as any)
      },
      canCORS: true,
    },
  ],
  baseUrl: "/api/project",
})

export { registerRouter }
