import { BlogPagenation } from "@/service/validate/blog"
import { Project, ProjectTranslation } from "../models"
import { ProjectPagenation } from "@/service/validate/project"

class ProjectDao {
  async getPagenationProjects({ page, limit, type = "zh" }: ProjectPagenation & Partial<ILanguage>) {
    return Project.findAndCountAll({
      offset: (+page - 1) * +limit,
      limit: +limit,
      where: {
        isValid: "Y",
      },
      order: [["createDate", "DESC"]],
      include: [
        {
          model: ProjectTranslation,
          as: "translations",
          where: {
            lang: type,
          },
        },
      ],
    })
  }
  async addProject({ scanNumber, commentNumber, thumb }: Omit<IProject, keyof IBaseModel | "isValid">) {
    return Project.create({
      scanNumber,
      //   createDate,
      commentNumber,
      thumb,
      //   description,
      //   toc,
      //   htmlContent,
      //   title,
    })
  }
  async getProjectById({ id, type = "zh" }: Pick<IProject, "id"> & Partial<ILanguage>) {
    return Project.findOne({
      where: {
        id,
        isValid: "Y",
      },
      include: [
        {
          model: ProjectTranslation,
          as: "translations",
          where: {
            lang: type,
          },
        },
      ],
    })
  }
}

export const projectDaoInstance = new ProjectDao()
