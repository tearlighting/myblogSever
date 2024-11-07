import { useCaptch } from "@/hooks/useCaptch"
import { useRoutes } from "@/hooks/useRoutes"
import qs from "querystring"
const { createCapch } = useCaptch()

const { registerRouter } = useRoutes({
  routerItems: [
    {
      url: "/",
      method: "get",
      async handler(request, response) {
        const captcha = createCapch()
        request.session.captcha = captcha.text
        // console.log(request.session, request.sessionStore)
        // console.log(request.sessionID)

        // setTimeout(() => {
        //   console.log(request.sessionStore)
        // }, 1000)

        // response.setHeader("Content-Type", "image/svg+xml")
        console.log(captcha.text)

        return Buffer.from(captcha.data)
      },
      needAuth: false,
      canCORS: true,
    },
  ],
  baseUrl: "/api/captcha",
})

export { registerRouter }
