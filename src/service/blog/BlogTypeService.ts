import { blogTypeDaoInstance } from "@/dao/blog"
import { FuncIntercepter, ParamType } from "@/hooks/useClassFunIntercepter"
import { BlogTypeValidate } from "../validate/blog"
import { ValidateError } from "@/utils/errorHelper"

class BlogTypeService {
  async getBlogTypes() {
    try {
      const res = (await blogTypeDaoInstance.getBlogTypes())?.map((v) => {
        const { id, name, count, order } = v.toJSON()
        return { id, name, articleCount: count, order }
      })
      return res
    } catch (e) {
      throw e
    }
  }
  @FuncIntercepter()
  async updateBlogType(@ParamType(BlogTypeValidate) { id, name, count, order }: Partial<IBlogType>) {
    try {
      const res = await blogTypeDaoInstance.getBlogTypeById({ id })
      if (res) {
        blogTypeDaoInstance.updateBlogType({ id, name, count, order })
      } else {
        throw new ValidateError("blogType dont exist")
      }
    } catch (e) {
      throw e
    }
  }
  @FuncIntercepter()
  async createBlogType(@ParamType(BlogTypeValidate) { name, count = 0, order }: Partial<IBlogType>) {
    try {
      await blogTypeDaoInstance.createBlogType({ name, count, order })
    } catch (e) {
      throw e
    }
  }
  async updateBlogTypes(arr: IBlogType[] | IBlogType) {
    try {
      const normalized = Array.isArray(arr) ? arr : [arr]
      return await Promise.all(
        normalized.map((item) => {
          if (item.id) {
            this.updateBlogType(item)
          } else {
            this.createBlogType(item)
          }
        })
      )
    } catch (e) {
      throw e
    }
  }

  async deleteBlogType({ id }: { id: string }) {
    try {
      const row = (await blogTypeDaoInstance.getBlogTypeById({ id })).getDataValue
      if (row) {
        return blogTypeDaoInstance.deleteBlogType(id)
      }
      throw new ValidateError("blogType dont exist")
    } catch (e) {
      throw e
    }
  }
}

export const blogTypeServiceInstance = new BlogTypeService()
