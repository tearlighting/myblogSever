import { useRoutes } from "@/hooks/useRoutes"
import { messageServiceInstance } from "@/service/messageService"

const { registerRouter } = useRoutes({
  routerItems: [
    {
      method: "get",
      url: "/",
      async handler(request) {
        return messageServiceInstance.getMessages(request.query as any)
      },
      canCORS: true,
    },
    {
      method: "post",
      url: "/",
      async handler(request) {
        return messageServiceInstance.addMessage(request.body)
      },
    },
  ],
  baseUrl: "/api/comment",
})

export { registerRouter }
