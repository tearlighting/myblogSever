import "express-session"

declare module "express-session" {
  interface SessionData {
    // user: {
    // 	name: string
    // }
    captcha: string
  }
}
