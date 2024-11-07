interface IMessage {
  id?: string
  nickName: string

  content: string

  avatar: string

  isValid: "Y" | "N"
  blogId?: string
}
