import { SiteMessage } from "../models"

class BlogMessageDao {
  addMessage({ nickName, content, avatar }: Omit<ISiteMessage, "id">) {
    return SiteMessage.create({
      nickName,
      content,
      avatar,
    })
  }
  getPagenationMessages({ page, limit }: { page: number; limit: number }) {
    return SiteMessage.findAndCountAll({
      offset: (+page - 1) * +limit,
      limit: +limit,
      where: {
        isValid: "Y",
      },
      order: [["createdAt", "DESC"]],
    })
  }
  getAllMessages() {
    return SiteMessage.findAll({
      where: {
        isValid: "Y",
      },
      order: [["createdAt", "DESC"]],
    })
  }
  deleteMessage({ id }: Pick<ISiteMessage, "id">) {
    return SiteMessage.update(
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
  getMessageById({ id }: Pick<ISiteMessage, "id">) {
    return SiteMessage.findOne({
      where: {
        id: id,
        isValid: "Y",
      },
    })
  }
}

export const siteMessageDaoInstance = new BlogMessageDao()
