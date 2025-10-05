import { BlogTranslation } from "../models"

class BlogTranslationDao {
  createBlogTranslation({ lang, title, description, blogId, toc, htmlContent }: Omit<IBlogTranslation, keyof IBaseModel | "isValid">) {
    return BlogTranslation.create({
      lang,
      title,
      description,
      blogId,
      toc,
      htmlContent,
    })
  }
  updateBlogTranslation(id: string, payload: Partial<Omit<IBlogTranslation, "isValid" | "id">>) {
    return BlogTranslation.update(payload, {
      where: {
        id,
        isValid: "Y",
      },
    })
  }
  deleteBlogTranslation(id: string) {
    return BlogTranslation.update(
      { isValid: "N" },
      {
        where: {
          id,
          isValid: "Y",
        },
      }
    )
  }
  getBlogTranslation(id: string) {
    return BlogTranslation.findOne({
      where: {
        id,
        isValid: "Y",
      },
    })
  }
}

export const blogTranslationDaoInstance = new BlogTranslationDao()
