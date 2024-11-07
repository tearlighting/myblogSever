import { sequelizeHelperInstance } from "../dbConnect"
import { AdminSetting, Admin } from "./adminModel"
import { homeSetting, Home } from "./homeModel"
import { blogTypeSetting, blogSetting, blogSetting_JP } from "./blog"
import { messageSetting } from "./messageModel"
import { association } from "./association"
import { ProjectSetting, ProjectSetting_JP } from "./project"

import md5 from "md5"
sequelizeHelperInstance
  .initModels(association, AdminSetting, homeSetting, blogTypeSetting, blogSetting, blogSetting_JP, messageSetting, ProjectSetting, ProjectSetting_JP)
  .then(async (v) => {
    if (!v) {
      return
    }
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
  .then(() => {
    console.log("db data synchronized successfully")
  })
