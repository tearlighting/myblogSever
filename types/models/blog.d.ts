interface IBlogType extends IBaseModel {
  name: string
  count: number
  order: number
  isValid: "Y" | "N"
}

interface IBlog extends IBaseModel {
  thumb: string
  scanNumber: string
  commentNumber: string
  isValid: "Y" | "N"
  blogTypeId: string
}

interface IBlogTranslation extends IBaseModel {
  title: string
  description: string
  toc: string
  htmlContent: string
  lang: string
  blogId: string
  isValid: "Y" | "N"
}
