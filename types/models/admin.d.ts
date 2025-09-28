interface IBaseModel {
  id: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

interface IAdmin extends IBaseModel {
  loginId: string
  name: string
  loginPwd: string
  role: string
  isValid: "Y" | "N"
}
