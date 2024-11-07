import { length } from "class-validator"
import fs from "fs"
import path from "path"

function IFrameTagHelper(value: string, beforeValue: string = "") {
  const reg1 = /<iframe\b[^>]*>/

  if (value && reg1.test(value)) {
    const res = reg1.exec(value)
    const tagIndex = res.index
    beforeValue += value.slice(0, res.index + res[0].length)
    value = value.slice(tagIndex + res[0].length)
    // console.log(value)

    const nextTagIndex = value.includes("<iframe") ? value.indexOf("<iframe") : value.length - 1
    const nextTagEndIndex = value.slice(0, nextTagIndex).indexOf("</iframe>")

    if (nextTagEndIndex === -1) {
      beforeValue += "</iframe>"
      return IFrameTagHelper(value, beforeValue)
    } else {
      beforeValue += value.slice(0, nextTagIndex)
      value = value.slice(nextTagEndIndex + "</iframe>".length)
      return IFrameTagHelper(value, beforeValue)
    }
  }
  return beforeValue + value
}

export function useReadMD(absolutePath: string) {
  function reader() {
    const res = fs.readFileSync(absolutePath, {
      encoding: "utf-8",
    })

    // console.log(IFrameTagHelper(res))

    return IFrameTagHelper(res)
  }
  function write2File(value: string) {
    fs.writeFileSync(path.resolve(absolutePath, "../test.txt"), value)
  }
  return {
    reader,
    write2File,
  }
}
