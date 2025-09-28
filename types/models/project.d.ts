interface IProject extends IBaseModel {
  thumb: string
  scanNumber: string
  commentNumber: string
  isValid: "Y" | "N"
}

interface IProjectTranslation extends IBaseModel {
  title: string
  description: string
  toc: string
  htmlContent: string
  lang: string
  projectId: string
}
