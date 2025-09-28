import { IsNotEmpty, IsString } from "class-validator"

class MessageValidate implements Omit<IBlogMessage, keyof IBaseModel> {
  @IsNotEmpty()
  @IsString()
  nickName: string
  @IsNotEmpty()
  @IsString()
  content: string
  @IsNotEmpty()
  @IsString()
  avatar: string
  isValid: "Y" | "N"
  blogId: string
}

export { MessageValidate }
