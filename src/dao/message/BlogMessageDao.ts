import { BlogMessage } from "../models"

class BlogMessageDao {
  addMessage({ nickName, content, avatar, blogId }: Omit<IBlogMessage, keyof IBaseModel | "isValid">) {
    return BlogMessage.create({
      nickName,
      content,
      avatar,
      blogId,
    })
  }
  getPagenationMessages({ blogId, page, limit }: Partial<IBlogMessage> & { page: number; limit: number }) {
    return BlogMessage.findAndCountAll({
      offset: (+page - 1) * +limit,
      limit: +limit,
      where: {
        isValid: "Y",
        blogId: blogId,
      },
      order: [["createdAt", "DESC"]],
    })
  }
  getAllMessages({ blogId }: Partial<IBlogMessage> = {}) {
    return BlogMessage.findAll({
      where: {
        isValid: "Y",
        blogId: blogId,
      },
      order: [["createdAt", "DESC"]],
    })
  }
  deleteMessage({ id }: Pick<IBlogMessage, "id">) {
    return BlogMessage.update(
      {
        isValid: "N",
      },
      {
        where: {
          id: id,
          isValid: "Y",
        },
      }
    )
  }
  getMessageById({ id }: Pick<IBlogMessage, "id">) {
    return BlogMessage.findOne({
      where: {
        id: id,
        isValid: "Y",
      },
    })
  }
}

export const messageDaoInstance = new BlogMessageDao()
