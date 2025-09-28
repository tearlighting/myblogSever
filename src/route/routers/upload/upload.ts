import { useRoutes } from "@/hooks/useRoutes"
import { createUploadHandler } from "@/utils/uploadHelper"

const { registerRouter } = useRoutes({
  routerItems: [
    {
      method: "post",
      url: "/imgs",
      async handler(request, response) {
        return createUploadHandler("uploads/imgs")(request, response)
      },
      canCORS: true,
      needAuth: true,
    },
  ],
  baseUrl: "/api/upload",
})

export { registerRouter }
