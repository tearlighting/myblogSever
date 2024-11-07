import { IsString, Length } from "class-validator"

class AdminValidate implements IAdmin {
  id: string | number
  @Length(1, 20, {
    groups: ["checkUserValid"],
  })
  @IsString({
    groups: ["checkUserValid"],
  })
  loginId: string
  @Length(1)
  @IsString()
  name: string
  @Length(6, 40, {
    message: "pwd between 6~20",
    groups: ["checkUserValid"],
  })
  @IsString({
    groups: ["checkUserValid"],
  })
  loginPwd: string
  isValid: "Y" | "N"
  role: string
}

export { AdminValidate }
