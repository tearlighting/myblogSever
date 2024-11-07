interface ILoginData extends Partial<IAdmin> {
  remember?: string | number
  captcha: string
}

interface ILoginReturn extends Required<Pick<ILoginData, "loginId" | "name">> {
  role: string
}

interface IUpdateUserPwd extends Pick<IAdmin, "loginId" | "loginPwd" | "name"> {
  oldPwd: string
}
