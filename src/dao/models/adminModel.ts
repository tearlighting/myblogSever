import { Attributes, DataTypes, InferAttributes, InferCreationAttributes, InitOptions, Model, ModelAttributes, ModelStatic, Optional } from "sequelize"
import { setModel } from "@/utils/sequelizeHelper"

export class Admin extends Model<InferAttributes<Admin, { omit: "id" }>, InferCreationAttributes<Admin, { omit: "id" }>> implements IAdmin {
  declare role: string
  declare isValid: "Y" | "N"
  declare id: string | number
  declare loginId: string
  declare name: string
  declare loginPwd: string
}

const AdminSetting = setModel({
  model: Admin,
  attributes: {
    isValid: {
      type: DataTypes.STRING(1),
      defaultValue: "Y",
    },
    loginId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "user",
    },
  },
  options: {
    freezeTableName: true,
    tableName: "admin",
  },
})

export { AdminSetting }
