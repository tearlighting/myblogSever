import path, { resolve } from "path"
import { useReadMD } from "@/hooks/useReaderMarkDown"
import markdownit from "markdown-it"
import anchor from "markdown-it-anchor"
import { useMDTOC } from "@/hooks/useMarkDownToc"
import { projectServiceInstance } from "@/service/projectService"

// const { reader, write2File } = useReadMD(path.resolve(__dirname, "../client/md/css3.md"))

// const { markdownitAnchorCallback, getToc, initalToc } = useMDTOC()

const project: Array<Partial<IProjectObject> & Partial<ILanguage> & Record<"filePath", string>> = [
  {
    thumb: "/img/firstVue.gif",
    description: "使用vue做的第一个看板",
    toc: null,
    htmlContent: "",
    title: "第一个vue页面",
    filePath: path.resolve(__dirname, "../../", "../client/project/firstVue.md"),
  },
  {
    thumb: "/img/human.gif",
    description: "简单的人员管理系统",
    toc: null,
    htmlContent: "",
    title: "human management",
    filePath: path.resolve(__dirname, "../../", "../client/project/humanManagement.md"),
  },
  {
    thumb: "/img/JS.png",
    description: "微信小程序记录",
    toc: null,
    htmlContent: "JS进阶学习,主要是关于ES6的查漏补缺,理解原理才能更好应用",
    title: "wechat mini program",
    filePath: path.resolve(__dirname, "../../", "../client/project/wechat.md"),
  },
  {
    thumb: "/img/msp0.gif",
    description: "Big Data Board can see different chart about production",
    toc: null,
    htmlContent: "一直很在意的工程化问题,只有通过node的学习了解全貌,对传统后端经验及前端经验的人并不困难",
    title: "Big Data Board",
    filePath: path.resolve(__dirname, "../../", "../client/project/msp0.md"),
  },
  {
    thumb: "/img/vsp0all.png",
    description: "常见包管理器及其区别",
    toc: null,
    htmlContent: "",
    title: "模具管理系统",
    filePath: path.resolve(__dirname, "../../", "../client/project/vspomoudles.md"),
  },
  {
    thumb: "/img/board.png",
    description: "特定数据看板",
    toc: null,
    htmlContent: "",
    title: "模具备模看板",
    filePath: path.resolve(__dirname, "../../", "../client/project/chartBoard.md"),
  },
]

const projectJp: Array<Partial<IProjectObject> & Partial<ILanguage> & Record<"filePath", string>> = [
  {
    thumb: "/img/firstVue.gif",
    description: "Vue を使用して作成された最初のかんばんボード",
    toc: null,
    htmlContent: "",
    title: "初めてのVueページ",
    filePath: path.resolve(__dirname, "../../", "../client/project_jp/firstVue.md"),
    type: "jp",
  },
  {
    thumb: "/img/human.gif",
    description: "簡単な人员管理システム",
    toc: null,
    htmlContent: "",
    title: "human management",
    filePath: path.resolve(__dirname, "../../", "../client/project_jp/humanManagement.md"),
    type: "jp",
  },
  {
    thumb: "/img/JS.png",
    description: "微信小程序レコード",
    toc: null,
    htmlContent: "JS进阶学习,主要是关于ES6的查漏补缺,理解原理才能更好应用",
    title: "wechat mini app",
    filePath: path.resolve(__dirname, "../../", "../client/project_jp/wechat.md"),
    type: "jp",
  },
  {
    thumb: "/img/msp0.gif",
    description: "Big Data Board can see different chart about production",
    toc: null,
    htmlContent: "一直很在意的工程化问题,只有通过node的学习了解全貌,对传统后端经验及前端经验的人并不困难",
    title: "Big Data Board",
    filePath: path.resolve(__dirname, "../../", "../client/project_jp/msp0.md"),
    type: "jp",
  },
  {
    thumb: "/img/vsp0all.png",
    description: "キャビティー管理システム",
    toc: null,
    htmlContent: "",
    title: "キャビティー管理システム",
    filePath: path.resolve(__dirname, "../../", "../client/project_jp/vspomoudles.md"),
    type: "jp",
  },
  {
    thumb: "/img/board.png",
    description: "特定データかんばんボード",
    toc: null,
    htmlContent: "",
    title: "キャビティーかんばんボード",
    filePath: path.resolve(__dirname, "../../", "../client/project_jp/chartBoard.md"),
    type: "jp",
  },
]
export async function initProjects() {
  const res = await Promise.all(
    project.map(async (x) => {
      const { markdownitAnchorCallback, getToc, initalToc } = useMDTOC()
      const { reader } = useReadMD(x.filePath)
      const md = markdownit({
        html: true,
      })
      md.use(anchor, {
        level: [1, 2, 3],
        callback: markdownitAnchorCallback,
      })
      const html = md.render(reader())
      const toc = getToc()

      x.toc = await deepCopy(toc)
      x.htmlContent = html
      ;(x.scanNumber = "0"), (x.commentNumber = "0")
      console.log(x)
      return x
    })
  )
  //   console.log(res)

  setTimeout(() => {
    res.forEach((x) => {
      projectServiceInstance.addProject(x)
    })
  }, 5000)
}

export async function initProjectsJP() {
  const res = await Promise.all(
    projectJp.map(async (x) => {
      const { markdownitAnchorCallback, getToc, initalToc } = useMDTOC()
      const { reader } = useReadMD(x.filePath)
      const md = markdownit({
        html: true,
      })
      md.use(anchor, {
        level: [1, 2, 3],
        callback: markdownitAnchorCallback,
      })
      const html = md.render(reader())
      const toc = getToc()

      x.toc = await deepCopy(toc)
      x.htmlContent = html
      ;(x.scanNumber = "0"), (x.commentNumber = "0")
      console.log(x)
      return x
    })
  )

  setTimeout(() => {
    res.forEach((x) => {
      projectServiceInstance.addProject(x)
    })
  }, 5000)
}
function deepCopy<T>(data: T) {
  return new Promise<T>((resolve) => {
    const { port1, port2 } = new MessageChannel()
    port1.postMessage(data)
    port2.on("message", (e) => {
      console.log(`e`, e)

      resolve(e)
    })
  })
}
