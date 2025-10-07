import { FuncIntercepter, ParamType } from "@/hooks/useClassFunIntercepter"
import { ProjectObjectValidate, ProjectPagenation } from "../validate/project"
import { projectDaoInstance } from "@/dao/project"
import { UnknownError, ValidateError } from "@/utils/errorHelper"
import { string2Toc } from "@/utils/custom/toc"
import { string2HtmlContent } from "@/utils/custom/htmlContent"

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
    try {
      const newPro = await projectDaoInstance.createProject({
        scanNumber,
        commentNumber,
        thumb,
      })
      if (!newPro?.toJSON) {
        throw new UnknownError("create project error")
      }
    } catch (e) {
      throw e
    }
  }
  async getProjectById({ id }: Pick<IProject, "id">) {
    const res = await projectDaoInstance.getProjectById({ id })
    try {
      if (!res?.toJSON) {
        throw new ValidateError("id dont exist")
      }
      const { id, scanNumber, commentNumber, thumb } = res.toJSON()
      const translations = res.translations.map((v) => {
        const { title, description, toc, htmlContent, lang, id } = v.toJSON()
        return {
          id,
          title,
          description,
          toc: string2Toc(toc),
          htmlContent: string2HtmlContent(htmlContent),
          lang,
        }
      })
      return {
        id,
        thumb,
        scanNumber,
        commentNumber,
        translations,
      }
    } catch (e) {
      throw e
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
