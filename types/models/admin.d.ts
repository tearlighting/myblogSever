interface IAdmin {
  id: string | number
  loginId: string
  name: string
  loginPwd: string
  isValid: "Y" | "N"
  role: string
}
