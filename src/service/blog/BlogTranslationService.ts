import { blogTranslationDaoInstance } from "@/dao/blog"
import { ValidateError } from "@/utils/errorHelper"
import { handleMarkdown } from "@/utils/markdownHelper"

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
      const row = await blogTranslationDaoInstance.createBlogTranslation({ toc, htmlContent, title, description, blogId, lang })
      return row.toJSON()
    } catch (e) {
      throw e
    }
  }
}

export const blogTranslationServiceInstance = new BlogTranslationService()
