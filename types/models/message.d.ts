interface IBlogMessage extends IBaseModel {
  nickName: string
  content: string
  avatar: string
  isValid: "Y" | "N"
  blogId: string
}

type ISiteMessage = Omit<IBlogMessage, "blogId">
