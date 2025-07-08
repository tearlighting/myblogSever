import { setModel } from "@/utils/sequelizeHelper"
import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"

export class BlogType extends Model<InferAttributes<BlogType, { omit: "id" }>, InferCreationAttributes<BlogType, { omit: "id" }>> implements IBlogType {
  declare id: string
  declare name: string
  declare count: number
  declare order: number
  declare isValid: "Y" | "N"
  //   static associations: { [key: string]: Association<Model<any, any>, Model<any, any>> }
}

export const blogTypeSetting = setModel({
  model: BlogType,
  attributes: {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isValid: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "Y",
    },
  },
  options: {
    tableName: "blogtype",
    freezeTableName: true,
  },
})
