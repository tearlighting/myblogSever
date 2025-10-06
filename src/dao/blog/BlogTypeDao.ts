import { BlogType } from "../models"

export class BlogTypeDao {
  getBlogTypes() {
    return BlogType.findAll({
      order: [["order", "asc"]],
      where: {
        isValid: "Y",
      },
    })
  }
  getBlogTypeById({ id }: Pick<IBlogType, "id">) {
    return BlogType.findOne({
      where: {
        id,
        isValid: "Y",
      },
      order: [["order", "DESC"]],
    })
  }
  updateBlogType({ id, name, count, order }: Pick<IBlogType, "id" | "name" | "count" | "order">) {
    return BlogType.update(
      {
        name,
        count,
        order,
      },
      {
        where: {
          id,
          isValid: "Y",
        },
      }
    )
  }
  createBlogType({ name, count, order }: Pick<IBlogType, "name" | "count" | "order">) {
    return BlogType.create({
      name,
      count,
      order,
    })
  }
  deleteBlogType(id: string) {
    return BlogType.update(
      {
        isValid: "N",
      },
      {
        where: {
          id,
        },
      }
    )
  }
}

export const blogTypeDaoInstance = new BlogTypeDao()
