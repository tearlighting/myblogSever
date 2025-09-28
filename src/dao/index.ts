import md5 from "md5"
import { dbIns } from "./db"
import { Admin, Home, Blog, BlogType, BlogTranslation, SiteMessage, BlogMessage, Project, ProjectTranslation } from "./models"

dbIns
  .testConnection()
  .then(() => {
    dbIns.addModel(Admin).addModel(Home).addModel(Blog).addModel(BlogType).addModel(BlogTranslation).addModel(SiteMessage).addModel(BlogMessage).addModel(Project).addModel(ProjectTranslation).sync()
  })
  .then(async () => {
    const adminCount = await Admin.count()
    if (!adminCount) {
      Admin.create({
        loginId: "admin",
        name: "超级管理员",
        loginPwd: md5("123456"),
      })
    }
    const homeCount = await Home.count()
    if (!homeCount) {
      Home.bulkCreate([
        {
          img: "/img/",
          placeHolderImg: null,
          title: "title",
          description: "description",
        },
      ])
    }
  })
  .catch((e) => console.log(e))
