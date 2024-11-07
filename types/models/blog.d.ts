interface IBlogType {
  id: string
  name: string
  count: number
  order: number
  isValid: "Y" | "N"
}

interface IBlog {
  id: string
  title: string
  description: string
  toc: string
  htmlContent: string
  thumb: string
  scanNumber: string
  commentNumber: string
  createDate: string
  isValid: "Y" | "N"
  blogType: string
}
