import { setModel } from "@/utils/sequelizeHelper"
import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"

export class Blog extends Model<InferAttributes<Blog, { omit: "id" | "blogType" }>, InferCreationAttributes<Blog, { omit: "id" | "blogType" }>> implements IBlog {
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

export const blogSetting = setModel({
  model: Blog,
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
    tableName: "blog",
  },
})
