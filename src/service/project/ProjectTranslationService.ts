import { projectTranslationDaoInstance } from "@/dao/project"
import { ValidateError } from "@/utils/errorHelper"
import { handleMarkdown } from "@/utils/markdownHelper"

class ProjectTranslationService {
  async updateProjectTranslation({ id, markdownContent, title, description }: Pick<IProjectTranslation, "id" | "title" | "description"> & { markdownContent: string }) {
    try {
      const translationRow = await projectTranslationDaoInstance.getBlogTranslation(id)
      if (!translationRow?.toJSON) {
        throw new ValidateError("translation not exist")
      }
      const { toc, htmlContent } = handleMarkdown(markdownContent)
      await projectTranslationDaoInstance.updateBlogTranslation(id, { toc, htmlContent, title, description })
      return true
    } catch (e) {
      throw e
    }
  }

  async createProjectTranslation({ title, description, projectId, lang, markdownContent }: Pick<IProjectTranslation, "lang" | "projectId" | "title" | "description"> & { markdownContent: string }) {
    try {
      const { toc, htmlContent } = handleMarkdown(markdownContent)
      await projectTranslationDaoInstance.createBlogTranslation({ toc, htmlContent, title, description, projectId, lang })
      return true
    } catch (e) {
      throw e
    }
  }
}

export const projectTranslationServiceInstance = new ProjectTranslationService()
