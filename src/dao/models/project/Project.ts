import { dbIns } from "@/dao/db"
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from "sequelize"
import { ProjectTranslation } from "./ProjectTranslation"

export class Project
  extends Model<
    InferAttributes<Project>,
    InferCreationAttributes<Project> // 创建时哪些可缺省
  >
  implements IProject
{
  // 这部分是“类型声明”，不会真的创建列，但能让 TS 识别
  declare id: CreationOptional<string> // Sequelize 会自动生成（没必要写进 attributes）
  declare thumb: string
  declare scanNumber: string
  declare commentNumber: string
  declare isValid: "Y" | "N"
  declare translations: NonAttribute<ProjectTranslation[]> // 自动维护
  declare readonly createdAt: NonAttribute<Date> // 自动维护
  declare readonly updatedAt: NonAttribute<Date> // 自动维护
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Sequelize 自动生成 v4 UUID
      primaryKey: true,
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
    isValid: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "Y",
    },
  },
  {
    sequelize: dbIns.sequelize,
    tableName: "project",
    freezeTableName: true,
    timestamps: true,
  }
)
