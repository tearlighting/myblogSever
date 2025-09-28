import { dbIns } from "@/dao/db"
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from "sequelize"

export class SiteMessage
  extends Model<
    InferAttributes<SiteMessage>,
    InferCreationAttributes<SiteMessage> // 创建时哪些可缺省
  >
  implements ISiteMessage
{
  // 这部分是“类型声明”，不会真的创建列，但能让 TS 识别
  declare id: CreationOptional<string>
  declare nickName: string
  declare content: string
  declare avatar: string
  declare isValid: "Y" | "N"
  declare readonly createdAt: NonAttribute<Date> // 自动维护
  declare readonly updatedAt: NonAttribute<Date> // 自动维护
}

SiteMessage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Sequelize 自动生成 v4 UUID
      primaryKey: true,
    },
    nickName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isValid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Y",
    },
  },
  {
    sequelize: dbIns.sequelize,
    tableName: "sitemessage",
    freezeTableName: true,
    timestamps: true,
  }
)
