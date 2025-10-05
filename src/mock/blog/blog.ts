import path, { resolve } from "path"
import { useReadMD } from "@/hooks/useReaderMarkDown"
import markdownit from "markdown-it"
import anchor from "markdown-it-anchor"
import { useMDTOC } from "@/hooks/useMarkDownToc"
import { blogServiceInstance } from "@/service/blogService"

// const { reader, write2File } = useReadMD(path.resolve(__dirname, "../client/md/css3.md"))

// const { markdownitAnchorCallback, getToc, initalToc } = useMDTOC()

const blogs: Array<any & Partial<ILanguage> & Record<"filePath", string>> = [
  {
    blogType: "65",
    thumb: "/img/CSS.png",
    description: "HTML5+CSS3大大改善了开发体验,js确实很重要，css也是不可或缺的，让我们看看ccs3究竟新增了哪来内容",
    toc: null,
    htmlContent: "",
    title: "常用CSS3汇总",
    filePath: path.resolve(__dirname, "../../", "../client/md/css3.md"),
  },
  {
    blogType: "73",
    thumb: "/img/HTTP.png",
    description: "了解HTTP与HTTPS协议,学习网络请求原理",
    toc: null,
    htmlContent: "",
    title: "HTTP与HTTPS协议",
    filePath: path.resolve(__dirname, "../../", "../client/md/http.md"),
  },
  {
    blogType: "64",
    thumb: "/img/JS.png",
    description: "了解HTTP与HTTPS协议,学习网络请求原理",
    toc: null,
    htmlContent: "JS进阶学习,主要是关于ES6的查漏补缺,理解原理才能更好应用",
    title: "JS查漏补缺",
    filePath: path.resolve(__dirname, "../../", "../client/md/JavaScript.md"),
  },
  {
    blogType: "63",
    thumb: "/img/Node.png",
    description: "了解HTTP与HTTPS协议,学习网络请求原理",
    toc: null,
    htmlContent: "一直很在意的工程化问题,只有通过node的学习了解全貌,对传统后端经验及前端经验的人并不困难",
    title: "NodeJs学习",
    filePath: path.resolve(__dirname, "../../", "../client/md/node.md"),
  },
  {
    blogType: "74",
    thumb: "/img/NPM.png",
    description: "常见包管理器及其区别",
    toc: null,
    htmlContent: "",
    title: "node包管理器",
    filePath: path.resolve(__dirname, "../../", "../client/md/npm.md"),
  },
  {
    blogType: "67",
    thumb: "/img/webpack.png",
    description: "了解经典工程化打包工具原理",
    toc: null,
    htmlContent: "",
    title: "webpack原理",
    filePath: path.resolve(__dirname, "../../", "../client/md/webpack.md"),
  },
]

const blogsJp: Array<any & Partial<ILanguage> & Record<"filePath", string>> = [
  {
    blogType: "65",
    thumb: "/img/CSS.png",
    description: "HTML5+CSS3 は開発エクスペリエンスを大幅に向上させました。js は非常に重要ですが、css も不可欠です。ccs3 で追加された新しいコンテンツを見てみましょう",
    toc: null,
    htmlContent: "",
    title: "よく使われるCSS3のまとめ",
    filePath: path.resolve(__dirname, "../../", "../client/md_jp/css3.md"),
    type: "jp",
  },
  {
    blogType: "73",
    thumb: "/img/HTTP.png",
    description: "HTTP および HTTPS プロトコルを理解し、ネットワーク リクエストの原則を学ぶ",
    toc: null,
    htmlContent: "",
    title: "HTTP および HTTPS プロトコル",
    filePath: path.resolve(__dirname, "../../", "../client/md_jp/http.md"),
    type: "jp",
  },
  {
    blogType: "64",
    thumb: "/img/JS.png",
    description: "高度な JS 学習。主に ES6 のギャップを確認して埋めることについてです。原理を理解することによってのみ、それらをより適切に適用できます。",
    toc: null,
    htmlContent: "",
    title: "JS補い",
    filePath: path.resolve(__dirname, "../../", "../client/md_jp/JavaScript.md"),
    type: "jp",
  },
  {
    blogType: "63",
    thumb: "/img/Node.png",
    description: "一直很在意的工程化问题,只有通过node的学习了解全貌,对传统后端经验及前端经验的人并不困难",
    toc: null,
    htmlContent: "私が常に懸念していたエンジニアリングの問題は、ノードを学習することで理解できます。バックエンドの経験とフロントエンドの経験がある人にとっては、難しいことではありません。",
    title: "NodeJs勉強",
    filePath: path.resolve(__dirname, "../../", "../client/md_jp/node.md"),
    type: "jp",
  },
  {
    blogType: "74",
    thumb: "/img/NPM.png",
    description: "一般的なパッケージマネージャーとその違い",
    toc: null,
    htmlContent: "",
    title: "node package manager",
    filePath: path.resolve(__dirname, "../../", "../client/md_jp/npm.md"),
    type: "jp",
  },
  {
    blogType: "67",
    thumb: "/img/webpack.png",
    description: "クラシックなエンジニアリング パッケージング ツールの原理を理解する",
    toc: null,
    htmlContent: "",
    title: "webpack原理",
    filePath: path.resolve(__dirname, "../../", "../client/md_jp/webpack.md"),
    type: "jp",
  },
]
export async function initBlogs() {
  const res = await Promise.all(
    blogs.map(async (x) => {
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
      return x
    })
  )

  setTimeout(() => {
    res.forEach((x) => {
      blogServiceInstance.createBlog(x)
    })
  }, 5000)
}

export async function initBlogsJP() {
  const res = await Promise.all(
    blogsJp.map(async (x) => {
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
      blogServiceInstance.createBlog(x)
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
