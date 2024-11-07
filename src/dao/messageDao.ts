import { Blog } from "./models/blog"
import { MessageModel } from "./models/messageModel"

class MessageDao {
  addMessage({ nickName, content, avatar, blogId }: Partial<IMessage>) {
    return MessageModel.create({
      nickName,
      content,
      avatar,
      ...(blogId ? { blogId } : {}),
    })
  }
  getPagenationMessages({ blogId, page, limit }: Partial<IMessage> & { page: number; limit: number }) {
    return MessageModel.findAndCountAll({
      offset: (+page - 1) * +limit,
      limit: +limit,
      where: blogId
        ? {
            //@ts-ignore
            blogId,
          }
        : {},
    })
  }
  getAllMessages({ blogId }: Partial<IMessage> = {}) {
    return MessageModel.findAll({
      where: {
        //@ts-ignore
        blogId: blogId ? blogId : null,
      },
    })
  }
}

export const messageDaoInstance = new MessageDao()
