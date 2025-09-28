import { FuncIntercepter, ParamType } from "@/hooks/useClassFunIntercepter"
import { ProjectObjectValidate, ProjectPagenation } from "./validate/project"
import { projectDaoInstance } from "@/dao/project/projectDao"
import { string2Toc, toc2String } from "@/utils/custom/toc"
import { htmlContent2String, string2HtmlContent } from "@/utils/custom/htmlContent"
import { formatterDate } from "@/utils/custom"
import { ValidateError } from "@/utils/errorHelper"

class ProjectService {
  @FuncIntercepter()
  async getProjectsPagenation(@ParamType(ProjectPagenation) { page, limit, type = "zh" }: ProjectPagenation & Partial<ILanguage>) {
    const res = await projectDaoInstance.getPagenationProjects({ page, limit, type })

    return {
      total: res.count,
      rows: res.rows
        .map((v) => {
          const { id, scanNumber, commentNumber } = v.toJSON()
          const transactions = v.transactions.map((v) => {
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
            scanNumber,
            commentNumber,
            transactions,
          }
        })
        .sort((x, y) => Number(x.id) - Number(y.id)),
    }
  }
  @FuncIntercepter()
  async addProject(
    @ParamType(ProjectObjectValidate)
    { scanNumber = "0", commentNumber = "0", thumb }: Pick<IProject, "scanNumber" | "commentNumber" | "thumb">
  ) {
    const newPro = await projectDaoInstance.addProject({
      scanNumber,
      commentNumber,
      thumb,
    })
    if (!newPro) {
      return false
    }
    return true
  }
  async getProjectById({ id, type = "zh" }: Partial<IBlog> & Partial<ILanguage>) {
    if (!id) {
      throw new ValidateError("id dont exist")
    }
    const res = await projectDaoInstance.getProjectById({ id, type })
    try {
      const { id, scanNumber, commentNumber, thumb } = res.toJSON()
      const transactions = res.transactions.map((v) => {
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
}

export const projectServiceInstance = new ProjectService()
