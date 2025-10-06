import { useMDTOC } from "@/hooks/useMarkDownToc"
import markdownit from "markdown-it"
import anchor from "markdown-it-anchor"
import { toc2String } from "../custom/toc"
import { htmlContent2String } from "../custom/htmlContent"
export * from "./TOC"
export const handleMarkdown = (markdownContent: string) => {
  const { getToc, markdownitAnchorCallback } = useMDTOC()
  const md = markdownit({
    html: true,
  })
  md.use(anchor, {
    level: [1, 2, 3],
    callback: markdownitAnchorCallback,
  })
  const htmlContent = htmlContent2String({ htmlContent: md.render(markdownContent) })
  const toc = toc2String({ toc: getToc() })
  return {
    htmlContent,
    toc,
  }
}
