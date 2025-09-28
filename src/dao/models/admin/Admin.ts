import { dbIns } from "../../db"
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from "sequelize"

export class Admin
  extends Model<
    InferAttributes<Admin>,
    InferCreationAttributes<Admin> // 创建时哪些可缺省
  >
  implements IAdmin
{
  // 这部分是“类型声明”，不会真的创建列，但能让 TS 识别
  declare id: CreationOptional<string> // Sequelize 会自动生成（没必要写进 attributes）
  declare loginId: string
  declare name: string
  declare loginPwd: string
  declare role: string
  declare isValid: "Y" | "N"
  declare readonly createdAt: NonAttribute<Date> // 自动维护
  declare readonly updatedAt: NonAttribute<Date> // 自动维护
}

Admin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Sequelize 自动生成 v4 UUID
      primaryKey: true,
    },
    loginId: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    loginPwd: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING(10), allowNull: false, defaultValue: "user" },
    isValid: { type: DataTypes.STRING(1), defaultValue: "Y" },
  },
  {
    sequelize: dbIns.sequelize,
    tableName: "admin",
    freezeTableName: true,
    timestamps: true,
  }
)
