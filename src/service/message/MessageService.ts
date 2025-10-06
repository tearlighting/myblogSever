import { FuncIntercepter, ParamType } from "@/hooks/useClassFunIntercepter"
import { MessageValidate } from "../validate/message"
import { blogDaoInstance } from "@/dao/blog"
import { ValidateError } from "@/utils/errorHelper"
import { blogMessageDaoInstance } from "@/dao/message"
import { formatterDate } from "@/utils/custom"

class MessageService {
  @FuncIntercepter()
  async addMessage(@ParamType(MessageValidate) { nickName, content, avatar, blogId }: IBlogMessage) {
    if (blogId) {
      const blog = await blogDaoInstance.getBlogById({ id: blogId })
      if (!blog) {
        throw new ValidateError(`blogId ${blogId} dont exist`)
      }
      let commentNumber = +blog.commentNumber
      blog.commentNumber = (commentNumber++).toString()
      await blog.save()
    }
    const res = await blogMessageDaoInstance.addMessage({ nickName, content, avatar, blogId })
    return res.dataValues
  }
  async getMessages({ blogId, page, limit }: IBlogMessage & { page: number; limit: number }) {
    //获取文章评论
    if (blogId) {
      const blog = await blogDaoInstance.getBlogById({ id: blogId })
      if (!blog) {
        throw new ValidateError(`blogId ${blogId} dont exist`)
      }
      if (!page || !limit) {
        const res = await blogMessageDaoInstance.getAllMessages({ blogId })
        return {
          total: res.length,
          rows: res.map((x) => {
            const { nickName: nickname, id, content, createdAt: createDate, avatar } = x as any
            return { nickname, id, content, createDate: formatterDate(new Date(createDate)), avatar }
          }),
        }
      } else {
        return blogMessageDaoInstance.getPagenationMessages({ blogId, page, limit })
      }

      //获取网站留言
    } else {
      if (!page || !limit) {
        const res = await blogMessageDaoInstance.getAllMessages()
        return {
          total: res.length,
          rows: res.map((x) => {
            const { nickName: nickname, id, content, createdAt: createDate, avatar } = x as any
            return { nickname, id, content, createDate: formatterDate(new Date(createDate)), avatar }
          }),
        }
      } else {
        return blogMessageDaoInstance.getPagenationMessages({ page, limit })
      }
    }
  }
}

export const messageServiceInstance = new MessageService()
