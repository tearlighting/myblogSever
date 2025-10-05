import { blogDaoInstance, blogTranslationDaoInstance, blogTypeDaoInstance } from "@/dao/blog"
import { ValidateError } from "@/utils/errorHelper"
import { FuncIntercepter, ParamType } from "@/hooks/useClassFunIntercepter"
import { BlogTypeValidate, BlogObjectValidate, BlogPagenation } from "./validate/blog"
import { string2Toc, toc2String } from "@/utils/custom/toc"
import { htmlContent2String, string2HtmlContent } from "@/utils/custom/htmlContent"
import { handleMarkdown } from "@/utils/markdownHelper"

class BlogTypeService {
  async getBlogTypes() {
    const res = (await blogTypeDaoInstance.getBlogTypes())?.map((v) => {
      const { id, name, count, order } = v.toJSON()
      return { id, name, articleCount: count, order }
    })
    return res
  }
  @FuncIntercepter()
  async updateBlogType(@ParamType(BlogTypeValidate) { id, name, count, order }: Partial<IBlogType>) {
    const res = await blogTypeDaoInstance.getBlogTypeById({ id })
    if (res) {
      blogTypeDaoInstance.updateBlogType({ id, name, count, order })
    } else {
      throw new ValidateError("blogType dont exist")
    }
  }
  @FuncIntercepter()
  async addBlogType(@ParamType(BlogTypeValidate) { name, count = 0, order }: Partial<IBlogType>) {
    return blogTypeDaoInstance.insertBlogType({ name, count, order })
  }
  async updateBlogTypes(arr: IBlogType[] | IBlogType) {
    const normalized = Array.isArray(arr) ? arr : [arr]
    return Promise.all(
      normalized.map((item) => {
        if (item.id) {
          this.updateBlogType(item)
        } else {
          this.addBlogType(item)
        }
      })
    )
  }

  async deleteBlogType({ id }: { id: string }) {
    const row = (await blogTypeDaoInstance.getBlogTypeById({ id })).getDataValue
    if (row) {
      return blogTypeDaoInstance.deleteBlogType(id)
    }
    throw new ValidateError("blogType dont exist")
  }
}

export const blogTypeServiceInstance = new BlogTypeService()

class BlogService {
  @FuncIntercepter()
  async getBlogsPagenation(@ParamType(BlogPagenation) { id, page, limit }: BlogPagenation) {
    //查所有
    if (+id === -1) {
      //查固定type
    } else {
      const res = await blogTypeDaoInstance.getBlogTypeById({ id: id.toString() })
      if (!res) {
        throw new ValidateError(`blogType ${id} is not exist`)
      }
    }
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
  }
  @FuncIntercepter()
  async createBlog(
    @ParamType(BlogObjectValidate)
    { blogTypeId, scanNumber = "0", commentNumber = "0", thumb }: Pick<IBlog, "blogTypeId" | "scanNumber" | "commentNumber" | "thumb">
  ) {
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
      console.log(id)

      const blog = await blogDaoInstance.getBlogById({ id })
      if (!blog?.toJSON) {
        throw new ValidateError("blog dont exist")
      }
      const blogType = await blogTypeDaoInstance.getBlogTypeById({ id: blog.blogTypeId })
      blogType.count--
      await blogType.save()
      await blogDaoInstance.deleteBlog(id)
    } catch (e) {
      console.log(e)

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

class BlogTranslationService {
  async updateBlogTranslation({ id, markdownContent, title, description }: Pick<IBlogTranslation, "id" | "title" | "description"> & { markdownContent: string }) {
    try {
      const translationRow = await blogTranslationDaoInstance.getBlogTranslation(id)
      if (!translationRow?.toJSON) {
        throw new ValidateError("translation not exist")
      }
      const { toc, htmlContent } = handleMarkdown(markdownContent)
      await blogTranslationDaoInstance.updateBlogTranslation(id, { toc, htmlContent, title, description })
      return true
    } catch (e) {
      throw e
    }
  }

  async createBlogTranslation({ title, description, blogId, lang, markdownContent }: Pick<IBlogTranslation, "lang" | "blogId" | "title" | "description"> & { markdownContent: string }) {
    try {
      const { toc, htmlContent } = handleMarkdown(markdownContent)
      await blogTranslationDaoInstance.createBlogTranslation({ toc, htmlContent, title, description, blogId, lang })
      return true
    } catch (e) {
      throw e
    }
  }
}

export const blogTranslationServiceInstance = new BlogTranslationService()
