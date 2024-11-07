import fs from "fs"
import path from "path"
interface IWrite2FileParam {
  abPath?: string
  data: object
  description?: string
}

function formatter2MD({ data, description = "" }: { data: string; description?: string }) {
  return `\`\`\`ts
	        ${description ? `//${description}` : ""}
	        ${data}
\`\`\`
`
}

export function useResponseData2File() {
  function write2File({ abPath = path.resolve(__dirname, "../../client", "data/response.md"), data, description }: IWrite2FileParam) {
    const res = JSON.stringify(data)
    fs.writeFile(
      abPath,
      Buffer.from(formatter2MD({ data: res, description })),
      {
        flag: "a",
        encoding: "utf-8",
      },
      (e) => {
        console.log(e)
      }
    )
  }
  return {
    write2File,
  }
}
