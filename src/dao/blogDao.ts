import { BlogPagenation } from "@/service/validate/blog"
import { Blog, BlogJP, BlogType } from "./models/blog"

class BlogTypeDao {
  getBlogTypes() {
    return BlogType.findAll({
      order: [["order", "asc"]],
    })
  }
  getBlogTypeById({ id }: Partial<IBlogType>) {
    return BlogType.findOne({
      where: {
        //@ts-ignore
        id,
        isValid: "Y",
      },
      order: [["order", "DESC"]],
    })
  }
  updateBlogType({ id, name, count, order }: Partial<IBlogType>) {
    return BlogType.update(
      {
        name,
        count,
        order,
      },
      {
        where: {
          //@ts-ignore
          id,
          isValid: "Y",
        },
      }
    )
  }
  insertBlogType({ name, count, order }: Partial<IBlogType>) {
    return BlogType.create({
      name,
      count,
      order,
    })
  }
}

export const blogTypeDaoInstance = new BlogTypeDao()

class BlogDao {
  getPagenationBlogs({ id, page, limit, type = "zh" }: BlogPagenation & Partial<ILanguage>) {
    const Model = type === "zh" ? Blog : BlogJP
    return Model.findAndCountAll({
      include: {
        model: BlogType,
        as: "categoryInfo",
        where: {
          ...(+id === -1
            ? {}
            : {
                id,
              }),
        },
      },
      offset: (+page - 1) * +limit,
      limit: +limit,
    })
  }
  async addBlog({ blogType, scanNumber, createDate, commentNumber, thumb, description, toc, htmlContent, title, type = "zh" }: Partial<IBlog> & Partial<ILanguage>) {
    const Model = type === "zh" ? Blog : BlogJP
    return Model.create({
      //@ts-ignore
      blogType,
      scanNumber,
      createDate,
      commentNumber,
      thumb,
      description,
      toc,
      htmlContent,
      title,
    })
  }
  async getBlogById({ id, type = "zh" }: { id: string } & Partial<ILanguage>) {
    const Model = type === "zh" ? Blog : BlogJP
    return Model.findOne({
      include: [
        {
          model: BlogType,
          as: "categoryInfo",
        },
      ],
      where: {
        //@ts-ignore
        id,
      },
    })
  }
}

export const blogDaoInstance = new BlogDao()
