interface IBlogObject extends Partial<IBlog> {
  toc: ITOC[]
  htmlContent: string
  blogType: string
}
interface ITOC {
  name: string
  anchor: string
  tag: string
  children: ITOC[]
}
