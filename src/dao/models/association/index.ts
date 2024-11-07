import { Blog, BlogType, BlogJP } from "../blog"
import { MessageModel } from "../messageModel"

export function association() {
  BlogType.hasMany(Blog, {
    foreignKey: "blogType",
  })
  Blog.belongsTo(BlogType, { foreignKey: "blogType", targetKey: "id", as: "categoryInfo" })
  Blog.hasMany(MessageModel, { foreignKey: "blogId" })

  BlogType.hasMany(BlogJP, {
    foreignKey: "blogType",
  })
  BlogJP.belongsTo(BlogType, { foreignKey: "blogType", targetKey: "id", as: "categoryInfo" })

  MessageModel.belongsTo(Blog, { foreignKey: "blogId", targetKey: "id", as: "blogInfo" })
}
