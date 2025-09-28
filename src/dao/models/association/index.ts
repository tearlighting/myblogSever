import { Blog, BlogType, BlogTranslation } from "../blog"
import { BlogMessage } from "../message"
import { Project, ProjectTranslation } from "../project"

BlogType.hasMany(Blog, {
  foreignKey: "blogTypeId",
  as: "blogs",
})
Blog.belongsTo(BlogType, {
  as: "category",
  foreignKey: "blogTypeId",
})

Blog.hasMany(BlogTranslation, {
  foreignKey: "blogId",
  as: "translations",
})
BlogTranslation.belongsTo(Blog, { foreignKey: "blogId", targetKey: "id", as: "blog" })

Blog.hasMany(BlogMessage, { foreignKey: "blogId", as: "messages" })
BlogMessage.belongsTo(Blog, { foreignKey: "blogId", targetKey: "id", as: "blog" })

Project.hasMany(ProjectTranslation, {
  foreignKey: "projectId",
  as: "translations",
})
ProjectTranslation.belongsTo(Project, { foreignKey: "projectId", targetKey: "id", as: "project" })

export {}
