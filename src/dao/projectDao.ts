import { BlogPagenation } from "@/service/validate/blog"
import { ProjectJP, Project } from "./models/project"
import { ProjectPagenation } from "@/service/validate/project"

class ProjectDao {
  async getPagenationProjects({ page, limit, type = "zh" }: ProjectPagenation & Partial<ILanguage>) {
    const Model = type === "zh" ? Project : ProjectJP
    return Model.findAndCountAll({
      offset: (+page - 1) * +limit,
      limit: +limit,
      where: {
        isValid: "Y",
      },
    })
  }
  async addProject({ scanNumber, createDate, commentNumber, thumb, description, toc, htmlContent, title, type = "zh" }: Partial<IProject> & Partial<ILanguage>) {
    const Model = type === "zh" ? Project : ProjectJP
    return Model.create({
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
  async getProjectById({ id, type = "zh" }: { id: string } & Partial<ILanguage>) {
    const Model = type === "zh" ? Project : ProjectJP
    return Model.findOne({
      where: {
        //@ts-ignore
        id,
        isValid: "Y",
      },
    })
  }
}

export const projectDaoInstance = new ProjectDao()
