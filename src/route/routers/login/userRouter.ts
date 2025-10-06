import { useRoutes } from "@/hooks/useRoutes"
import { adminServiceInstance } from "@/service"

const { registerRouter } = useRoutes({
  routerItems: [
    {
      method: "put",
      async handler(request, response) {
        const oldUserInfo = request.user
        const newUserInfo = request.body as IUpdateUserPwd
        const [count] = await adminServiceInstance.updateUserPwd(newUserInfo)
        if (count) {
          adminServiceInstance.setAuthorization(response, { ...oldUserInfo, ...newUserInfo })
          const { name, loginId } = newUserInfo
          return { name, loginId }
        }
        return false
      },
      url: "/",
      needAuth: true,
      canCORS: true,
    },
  ],
  baseUrl: "/api/user",
})

export { registerRouter }
