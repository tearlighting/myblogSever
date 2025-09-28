import { dbIns } from "@/dao/db"
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize"

export class ProjectTranslation extends Model<InferAttributes<ProjectTranslation>, InferCreationAttributes<ProjectTranslation>> {
  declare id: CreationOptional<string>
  declare title: string
  declare description: string
  declare toc: string
  declare htmlContent: string
  declare lang: string
  declare projectId: CreationOptional<string>
  declare isValid: "Y" | "N"
}

ProjectTranslation.init(
  {
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Sequelize 自动生成 v4 UUID
      primaryKey: true,
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "zh",
    },
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
  },
  {
    sequelize: dbIns.sequelize,
    tableName: "projecttranslation",
    freezeTableName: true,
    timestamps: true,
  }
)
