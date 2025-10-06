import { useRoutes } from "@/hooks/useRoutes"
import { adminServiceInstance } from "@/service"
import { UnknownError, ValidateError } from "@/utils/errorHelper"

const routerItems: IRouterItem[] = [
  {
    method: "post",
    url: "/",
    async handler(request, response): Promise<ILoginReturn> {
      //   //@ts-ignore
      //   request.session.user = {
      //     name: "tlight",
      //   }
      //   return true

      const data = request.body as ILoginData
      //   console.log(request.session)

      if (!data.captcha || !request.session.captcha || data.captcha.toLowerCase() !== request.session.captcha.toLowerCase()) {
        throw new ValidateError("captcha error")
      }

      const { res, row } = await adminServiceInstance.isUserValidate(data)
      if (res) {
        await adminServiceInstance.setAuthorization(response, { ...data, ...row })
        return {
          name: row.name,
          loginId: row.loginId,
          role: row.role,
        }
      }
      throw new UnknownError("user not exist")
    },
    canCORS: true,
  },
]
const { registerRouter } = useRoutes({
  routerItems,
  baseUrl: "/api/login",
})

export { registerRouter }
