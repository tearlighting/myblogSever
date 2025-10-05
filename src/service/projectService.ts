import { FuncIntercepter, ParamType } from "@/hooks/useClassFunIntercepter"
import { ProjectObjectValidate, ProjectPagenation } from "./validate/project"
import { projectDaoInstance } from "@/dao/project/projectDao"
import { string2Toc, toc2String } from "@/utils/custom/toc"
import { htmlContent2String, string2HtmlContent } from "@/utils/custom/htmlContent"
import { formatterDate } from "@/utils/custom"
import { ValidateError } from "@/utils/errorHelper"

class ProjectService {
  @FuncIntercepter()
  async getProjectsPagenation(@ParamType(ProjectPagenation) { page, limit }: ProjectPagenation) {
    try {
      const res = await projectDaoInstance.getPagenationProjects({ page, limit })
      return {
        total: res.count,
        rows: res.rows.map((v) => {
          return {
            ...v.toJSON(),
            translations: v.translations.map((v) => v.toJSON()),
          }
        }),
      }
    } catch (e) {
      throw e
    }
  }
  @FuncIntercepter()
  async createProject(
    @ParamType(ProjectObjectValidate)
    { scanNumber = "0", commentNumber = "0", thumb }: Pick<IProject, "scanNumber" | "commentNumber" | "thumb">
  ) {
    const newPro = await projectDaoInstance.createProject({
      scanNumber,
      commentNumber,
      thumb,
    })
    if (!newPro) {
      return false
    }
    return true
  }
  async getProjectById({ id }: Pick<IProject, "id">) {
    if (!id) {
      throw new ValidateError("id dont exist")
    }
    const res = await projectDaoInstance.getProjectById({ id })
    try {
      const { id, scanNumber, commentNumber, thumb } = res.toJSON()
      const transactions = res.translations.map((v) => {
        const { title, description, toc, htmlContent } = v.toJSON()
        return {
          title,
          description,
          toc: string2Toc(toc),
          htmlContent: string2HtmlContent(htmlContent),
        }
      })
      return {
        id,
        thumb,
        scanNumber,
        commentNumber,
        transactions,
      }
    } finally {
      let scanNumber = Number(res.dataValues.scanNumber)
      res.scanNumber = (++scanNumber).toString()
      //   console.log(res.scanNumber)
      res.save()
    }
  }

  async updateProject({ id, commentNumber, scanNumber, thumb }: Pick<IProject, "id" | "commentNumber" | "scanNumber" | "thumb">) {
    try {
      const row = await projectDaoInstance.getProjectById({ id })
      if (!row?.toJSON) {
        throw new ValidateError("id dont exist")
      }
      await projectDaoInstance.updateProject({ id, commentNumber, scanNumber, thumb })
      return true
    } catch (e) {
      throw e
    }
  }

  async deleteProject({ id }: Pick<IProject, "id">) {
    try {
      const row = await projectDaoInstance.getProjectById({ id })
      if (!row?.toJSON) {
        throw new ValidateError("id dont exist")
      }
      row.isValid = "N"
      await row.save()
      return true
    } catch (e) {
      throw e
    }
  }
}

export const projectServiceInstance = new ProjectService()
