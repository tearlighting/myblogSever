import { setModel } from "@/utils/sequelizeHelper"
import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"

export class BlogJP extends Model<InferAttributes<BlogJP, { omit: "id" | "blogType" }>, InferCreationAttributes<BlogJP, { omit: "id" | "blogType" }>> implements IBlog {
  declare id: string
  declare title: string
  declare description: string
  declare toc: string
  declare htmlContent: string
  declare thumb: string
  declare scanNumber: string
  declare commentNumber: string
  declare createDate: string
  declare isValid: "Y" | "N"
  declare blogType: string
}

export const blogSetting_JP = setModel({
  model: BlogJP,
  attributes: {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    toc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    htmlContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isValid: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "Y",
    },
    thumb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scanNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  options: {
    tableName: "blog_jp",
  },
})
