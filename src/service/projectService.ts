import { FuncIntercepter, ParamType } from "@/hooks/useClassFunIntercepter"
import { ProjectObjectValidate, ProjectPagenation } from "./validate/project"
import { projectDaoInstance } from "@/dao/projectDao"
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
          const { id, title, description, scanNumber, commentNumber, createDate, toc, htmlContent } = v.dataValues as IProject
          return {
            id,
            title,
            description,
            scanNumber,
            commentNumber,
            createDate,
            toc: string2Toc(toc),
            htmlContent: string2HtmlContent(htmlContent),
          }
        })
        .sort((x, y) => Number(x.id) - Number(y.id)),
    }
  }
  @FuncIntercepter()
  async addProject(
    @ParamType(ProjectObjectValidate)
    { scanNumber = "0", createDate = formatterDate(), commentNumber = "0", thumb, description, toc, htmlContent, title, type = "zh" }: Partial<IProjectObject> & Partial<ILanguage>
  ) {
    const newPro = await projectDaoInstance.addProject({
      scanNumber,
      createDate,
      commentNumber,
      thumb,
      description,
      toc: toc2String({ toc }),
      htmlContent: htmlContent2String({ htmlContent }),
      title,
      type,
    })
    if (!newPro) {
      return false
    }
    return true
  }
  async getBlogById({ id, type = "zh" }: Partial<IBlog> & Partial<ILanguage>) {
    if (!id) {
      throw new ValidateError("id dont exist")
    }
    const res = await projectDaoInstance.getProjectById({ id, type })
    try {
      const { id, title, description, scanNumber, commentNumber, createDate, toc, htmlContent } = res.dataValues as IProject
      return {
        id,
        title,
        description,
        scanNumber,
        commentNumber,
        createDate,
        toc: string2Toc(toc),
        htmlContent: string2HtmlContent(htmlContent),
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
