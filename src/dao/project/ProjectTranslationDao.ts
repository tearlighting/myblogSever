import { ProjectTranslation } from "../models"

class ProjectTranslationDao {
  createBlogTranslation({ lang, title, description, toc, htmlContent, projectId }: Omit<IProjectTranslation, keyof IBaseModel | "isValid">) {
    return ProjectTranslation.create({
      lang,
      title,
      description,
      toc,
      htmlContent,
      projectId,
    })
  }
  updateBlogTranslation(id: string, payload: Partial<Omit<IProjectTranslation, "isValid" | "id">>) {
    return ProjectTranslation.update(payload, {
      where: {
        id,
        isValid: "Y",
      },
    })
  }
  deleteBlogTranslation(id: string) {
    return ProjectTranslation.update(
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
    return ProjectTranslation.findOne({
      where: {
        id,
        isValid: "Y",
      },
    })
  }
}

export const projectTranslationDaoInstance = new ProjectTranslationDao()
