import { blogDaoInstance, blogTypeDaoInstance } from "@/dao/blogDao"
import { ValidateError } from "@/utils/errorHelper"
import { FuncIntercepter, ParamType } from "@/hooks/useClassFunIntercepter"
import { BlogTypeValidate, BlogObjectValidate, BlogPagenation } from "./validate/blog"
import { string2Toc, toc2String } from "@/utils/custom/toc"
import { htmlContent2String, string2HtmlContent } from "@/utils/custom/htmlContent"
import { formatterDate } from "@/utils/custom"

class BlogTypeService {
  async getBlogTypes() {
    const res = (await blogTypeDaoInstance.getBlogTypes())?.map((v) => {
      const { id, name, count, order } = v.dataValues as IBlogType
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
  async updateBlogTypes(arr: IBlogType[]) {
    return Promise.all(
      arr.map((item) => {
        if (item.id) {
          this.updateBlogType(item)
        } else {
          this.addBlogType(item)
        }
      })
    )
  }
}

export const blogTypeServiceInstance = new BlogTypeService()

class BlogService {
  //   async getAllBlogs() {}
  //   @FuncIntercepter()
  //   async getBlogsByBlogType(@ParamType(BlogTypeValidate) { id, name, count, order }: Partial<IBlogType>) {}

  @FuncIntercepter()
  async getBlogsPagenation(@ParamType(BlogPagenation) { id, page, limit, type = "zh" }: BlogPagenation & Partial<ILanguage>) {
    //查所有
    if (+id === -1) {
      //查固定type
    } else {
      const res = await blogTypeDaoInstance.getBlogTypeById({ id: id.toString() })
      if (!res) {
        throw new ValidateError(`blogType ${id} is not exist`)
      }
    }
    const res = await blogDaoInstance.getPagenationBlogs({ id, page, limit, type })

    return {
      total: res.count,
      rows: res.rows
        .map((v) => {
          const { id, title, description, scanNumber, commentNumber, createDate, toc, htmlContent, categoryInfo } = v.dataValues as IBlog & { categoryInfo: IBlogType }
          return {
            id,
            title,
            description,
            scanNumber,
            commentNumber,
            createDate,
            toc: string2Toc(toc),
            htmlContent: string2HtmlContent(htmlContent),
            category: {
              id: categoryInfo.id,
              name: categoryInfo.name,
            },
          }
        })
        .sort((x, y) => Number(x.category.id) - Number(y.category.id)),
    }
  }
  @FuncIntercepter()
  async addBlog(
    @ParamType(BlogObjectValidate)
    { blogType, scanNumber = "0", createDate = formatterDate(), commentNumber = "0", thumb, description, toc, htmlContent, title, type = "zh" }: Partial<IBlogObject> & Partial<ILanguage>
  ) {
    //暂时验证没有处理异步的数据，blogType手动验证存不存在
    // blog
    const res = await blogTypeDaoInstance.getBlogTypeById({ id: blogType })
    if (!res) {
      throw new ValidateError(`blogType ${blogType} is not exist`)
    }
    const newBlog = await blogDaoInstance.addBlog({
      blogType,
      scanNumber,
      createDate,
      commentNumber,
      thumb,
      description,
      toc: toc2String({ toc }),
      htmlContent: htmlContent2String({ htmlContent }),
      title,
      type,
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
    const res = await blogDaoInstance.getBlogById({ id, type })
    try {
      const { id, title, description, scanNumber, commentNumber, createDate, toc, htmlContent, categoryInfo } = res.dataValues as IBlog & { categoryInfo: IBlogType }
      return {
        id,
        title,
        description,
        scanNumber,
        commentNumber,
        createDate,
        toc: string2Toc(toc),
        htmlContent: string2HtmlContent(htmlContent),
        category: {
          id: categoryInfo.id,
          name: categoryInfo.name,
        },
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
