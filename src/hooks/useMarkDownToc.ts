import { TOC } from "@/service/validate/blog"
import anchor from "markdown-it-anchor"
import Token from "markdown-it/lib/token.mjs"

export function useMDTOC() {
  const res: TOC[] = []
  //记录入栈以及出栈
  const stack: TOC[] = []
  function markdownitAnchorCallback(token: Token, anchorInfo: anchor.AnchorInfo) {
    const current = new TOC({
      name: anchorInfo.title,
      anchor: anchorInfo.slug,
      tag: token.tag,
    })

    handleTocStack(current)
  }

  function handleTocStack(current: TOC) {
    //会重复触发，这是包的问题
    if (current.anchor.slice(-2) === "-1") {
      //   console.log(current)
      return
    }
    if (!stack.length) {
      stack.push(current)
      res.push(current)
      return
    }
    const currentTag = current.tag.slice(-1)
    const topTag = stack[stack.length - 1].tag.slice(-1)
    //标签比你还小,你该出栈了,出到小于<=,或者出完
    if (currentTag <= topTag) {
      stack.pop()
      handleTocStack(current)
    } else {
      stack[stack.length - 1].children.push(current)
      stack.push(current)
    }
  }
  function getToc() {
    return res
  }
  function initalToc() {
    res.splice(0, res.length)
  }
  return {
    markdownitAnchorCallback,
    getToc,
    initalToc,
  }
}
