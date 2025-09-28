import { dbIns } from "@/dao/db"
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from "sequelize"

export class BlogMessage
  extends Model<
    InferAttributes<BlogMessage>,
    InferCreationAttributes<BlogMessage> // 创建时哪些可缺省
  >
  implements IBlogMessage
{
  // 这部分是“类型声明”，不会真的创建列，但能让 TS 识别
  declare id: CreationOptional<string>
  declare nickName: string
  declare content: string
  declare avatar: string
  declare isValid: "Y" | "N"
  declare blogId: CreationOptional<string>
  declare readonly createdAt: NonAttribute<Date> // 自动维护
  declare readonly updatedAt: NonAttribute<Date> // 自动维护
}

BlogMessage.init(
  {
    blogId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
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
    tableName: "blogmessage",
    freezeTableName: true,
    timestamps: true,
  }
)
