import { setModel } from "@/utils/sequelizeHelper"
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"

export class Home extends Model<InferAttributes<Home, { omit: "id" }>, InferCreationAttributes<Home, { omit: "id" }>> implements IBanner {
  declare id: CreationOptional<string>
  declare isValid: "Y" | "N"
  declare img: string
  declare placeHolderImg: string
  declare title: string
  declare description: string
}

export const homeSetting = setModel({
  model: Home,
  attributes: {
    isValid: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "Y",
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placeHolderImg: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  options: {
    tableName: "banner",
    freezeTableName: true,
  },
})
