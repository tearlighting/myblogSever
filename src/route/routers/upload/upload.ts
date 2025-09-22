import { useRoutes } from "@/hooks/useRoutes"
import { createUploadHandler } from "@/utils/uploadHelper"

const { registerRouter } = useRoutes({
  routerItems: [
    {
      method: "post",
      url: "/upload",
      async handler(request, response) {
        return createUploadHandler("imgs")(request, response)
      },
      canCORS: true,
      needAuth: true,
    },
  ],
  baseUrl: "/api/upload/imgs",
})

export { registerRouter }
