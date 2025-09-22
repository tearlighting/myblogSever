import multer from "multer"
import fs from "fs"
import path from "path"

export function createUploadHandler(targetDir: string) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, targetDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext
      cb(null, uniqueName)
    },
  })

  const upload = multer({ storage })

  // 返回一个函数，你可以放到 routerItem.handler 里
  return (req, res) =>
    new Promise((resolve, reject) => {
      upload.single("file")(req, res, (err) => {
        if (err) return reject(err)
        if (!req.file) return reject(new Error("No file uploaded"))
        resolve({
          url: `/uploads/${path.basename(targetDir)}/${req.file.filename}`,
        })
      })
    })
}
