import { BlogPagenation } from "@/service/validate/blog"
import { Blog, BlogTranslation, BlogType } from "../models"

class BlogDao {
  getPagenationBlogs({ id, page, limit }: BlogPagenation) {
    return Blog.findAndCountAll({
      distinct: true,
      col: "id",
      where: {
        isValid: "Y",
      },
      include: [
        {
          model: BlogType,
          as: "category",
          where: {
            isValid: "Y",
            ...(!id
              ? {}
              : {
                  id,
                }),
          },
        },
        {
          model: BlogTranslation,
          as: "translations",
          where: {
            isValid: "Y",
          },
          required: false,
        },
      ],
      offset: (+page - 1) * +limit,
      limit: +limit,
      order: [["updatedAt", "DESC"]],
    })
  }
  async createBlog({ blogTypeId: blogTypeId, scanNumber, commentNumber, thumb }: Omit<IBlog, keyof IBaseModel | "isValid">) {
    return Blog.create({
      blogTypeId: blogTypeId,
      scanNumber,
      commentNumber,
      thumb,
    })
  }
  async getBlogById({ id }: { id: string }) {
    return Blog.findOne({
      where: {
        id,
        isValid: "Y",
      },
      include: [
        {
          model: BlogType,
          as: "category",
          where: {
            isValid: "Y",
          },
        },
        {
          model: BlogTranslation,
          as: "translations",
          where: {
            isValid: "Y",
          },
          required: false,
        },
      ],
    })
  }
  async updateBlog(id: string, payload: Partial<Omit<IBlog, keyof IBaseModel>>) {
    console.log(payload)
    return Blog.update(payload, {
      where: {
        id,
        isValid: "Y",
      },
    })
  }
  async deleteBlog(id: string) {
    return Blog.update(
      {
        isValid: "N",
      },
      {
        where: {
          id,
          isValid: "Y",
        },
      }
    )
  }
}

export const blogDaoInstance = new BlogDao()
