import { FuncIntercepter, ParamType } from "@/hooks/useClassFunIntercepter"
import { BlogObjectValidate, BlogPagenation } from "../validate/blog"
import { blogDaoInstance, blogTypeDaoInstance } from "@/dao/blog"
import { ValidateError } from "@/utils/errorHelper"
import { string2Toc } from "@/utils/custom/toc"
import { string2HtmlContent } from "@/utils/custom/htmlContent"

class BlogService {
  @FuncIntercepter()
  async getBlogsPagenation(@ParamType(BlogPagenation) { id, page, limit }: BlogPagenation) {
    try {
      //查所有
      if (id) {
        const row = await blogTypeDaoInstance.getBlogTypeById({ id: id.toString() })
        if (!row?.toJSON) {
          throw new ValidateError(`blogType ${id} is not exist`)
        }
      }
      console.log(id, page, limit)

      const res = await blogDaoInstance.getPagenationBlogs({ id, page, limit })

      return {
        total: res.count,
        rows: res.rows.map((v) => {
          return {
            ...v.toJSON(),
            category: v.category.toJSON(),
            translations: v.translations.map((v) => v.toJSON()),
          }
        }),
      }
    } catch (e) {
      throw e
    }
  }
  @FuncIntercepter()
  async createBlog(
    @ParamType(BlogObjectValidate)
    { blogTypeId, scanNumber = "0", commentNumber = "0", thumb }: Pick<IBlog, "blogTypeId" | "scanNumber" | "commentNumber" | "thumb">
  ) {
    try {
      //暂时验证没有处理异步的数据，blogType手动验证存不存在
      // blog
      const res = await blogTypeDaoInstance.getBlogTypeById({ id: blogTypeId })
      if (!res?.toJSON) {
        throw new ValidateError(`blogType ${blogTypeId} is not exist`)
      }
      const newBlog = await blogDaoInstance.createBlog({
        blogTypeId,
        scanNumber,
        commentNumber,
        thumb,
      })
      if (newBlog) {
        res.count++
        await res.save()
      }
      return res.toJSON()
    } catch (e) {
      throw e
    }
  }
  async updateBlog({ blogTypeId, scanNumber, commentNumber, thumb, id }: Pick<IBlog, "blogTypeId" | "scanNumber" | "commentNumber" | "thumb" | "id">) {
    try {
      const blogType = await blogTypeDaoInstance.getBlogTypeById({ id: blogTypeId }).catch((e) => {
        throw new ValidateError(`blogType ${blogTypeId} is not exist`)
      })

      if (!blogType?.toJSON) {
        throw new ValidateError(`blogType ${blogTypeId} is not exist`)
      }
      const blogRaw = await blogDaoInstance.getBlogById({ id })
      const { blogTypeId: blogTypeIdRaw } = blogRaw.toJSON()
      //不是同一个blogType，要更新文章数量
      if (blogTypeIdRaw !== blogTypeId) {
        const blogTypeRaw = await blogTypeDaoInstance.getBlogTypeById({ id: blogTypeIdRaw })
        blogTypeRaw.count--
        blogType.count++
        await blogTypeRaw.save()
        await blogType.save()
      }
      await blogDaoInstance.updateBlog(id, { blogTypeId, scanNumber, commentNumber, thumb })
      return true
    } catch (e) {
      throw e
    }
  }
  async deleteBlog({ id }: Pick<IBlog, "id">) {
    try {
      const blog = await blogDaoInstance.getBlogById({ id })
      if (!blog?.toJSON) {
        throw new ValidateError("blog dont exist")
      }
      const blogType = await blogTypeDaoInstance.getBlogTypeById({ id: blog.blogTypeId })
      blogType.count--
      await blogType.save()
      await blogDaoInstance.deleteBlog(id)
    } catch (e) {
      throw e
    }
  }
  async getBlogById({ id }: Partial<IBlog>) {
    if (!id) {
      throw new ValidateError("id dont exist")
    }
    const res = await blogDaoInstance.getBlogById({ id })

    try {
      const { id, scanNumber, commentNumber } = res.toJSON()
      const category = res.category.toJSON()
      const translations = res.translations.map((v) => {
        const { id, title, description, toc, htmlContent, lang } = v.toJSON()
        return {
          id,
          title,
          description,
          toc: string2Toc(toc),
          htmlContent: string2HtmlContent(htmlContent),
          lang,
        }
      })
      const result = {
        id,
        scanNumber,
        commentNumber,
        category: {
          id: category.id,
          name: category.name,
        },
        translations,
      }
      return result
    } catch (e) {
      throw e
    } finally {
      let scanNumber = Number(res.dataValues.scanNumber)
      res.scanNumber = (++scanNumber).toString()
      res.save()
    }
  }
}

export const blogServiceInstance = new BlogService()
