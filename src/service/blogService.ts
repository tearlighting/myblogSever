import { blogDaoInstance, blogTranslationDaoInstance, blogTypeDaoInstance } from "@/dao/blog"
import { ValidateError } from "@/utils/errorHelper"
import { FuncIntercepter, ParamType } from "@/hooks/useClassFunIntercepter"
import { BlogTypeValidate, BlogObjectValidate, BlogPagenation } from "./validate/blog"
import { string2Toc, toc2String } from "@/utils/custom/toc"
import { htmlContent2String, string2HtmlContent } from "@/utils/custom/htmlContent"
import { formatterDate } from "@/utils/custom"

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
  async addBlog(
    @ParamType(BlogObjectValidate)
    { blogType, scanNumber = "0", commentNumber = "0", thumb }: Partial<IBlogObject> & Partial<ILanguage>
  ) {
    //暂时验证没有处理异步的数据，blogType手动验证存不存在
    // blog
    const res = await blogTypeDaoInstance.getBlogTypeById({ id: blogType })
    if (!res) {
      throw new ValidateError(`blogType ${blogType} is not exist`)
    }
    const newBlog = await blogDaoInstance.addBlog({
      blogTypeId: blogType,
      scanNumber,
      commentNumber,
      thumb,
      //   toc: toc2String({ toc }),
      //   htmlContent: htmlContent2String({ htmlContent }),
      //   title,
      //   type,
    })
    if (newBlog) {
      res.count++
      await res.save()
    }
    return true
  }
  async getBlogById({ id, type = "zh" }: Partial<IBlog> & Partial<ILanguage>) {
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
      return {
        id,
        scanNumber,
        commentNumber,
        category: {
          id: category.id,
          name: category.name,
        },
        translations,
      }
    } finally {
      let scanNumber = Number(res.dataValues.scanNumber)
      res.scanNumber = (++scanNumber).toString()
      //   console.log(res.scanNumber)

      res.save()
    }
  }
}

export const blogServiceInstance = new BlogService()
