import { useRoutes } from "@/hooks/useRoutes"
import { projectTranslationServiceInstance } from "@/service"

const { registerRouter } = useRoutes({
  routerItems: [
    {
      method: "post",
      url: "/",
      async handler(request) {
        return projectTranslationServiceInstance.createProjectTranslation(request.body)
      },
      canCORS: true,
      needAuth: true,
    },
    {
      method: "put",
      url: "/",
      async handler(request) {
        return projectTranslationServiceInstance.updateProjectTranslation(request.body)
      },
      canCORS: true,
      needAuth: true,
    },
  ],
  baseUrl: "/api/project/projectTranslation",
})

export { registerRouter }
