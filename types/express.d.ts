namespace Express {
  interface Request {
    body: Record<string, any>
    user: ILoginReturn
  }
}
