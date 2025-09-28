import { dbIns } from "@/dao/db"
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize"
import type { BlogType } from "./BlogType"
import type { BlogTranslation } from "./BlogTranslationModel"

export class Blog extends Model<InferAttributes<Blog>, InferCreationAttributes<Blog>> implements IBlog {
  declare id: CreationOptional<string>
  declare thumb: string
  declare scanNumber: string
  declare commentNumber: string
  declare isValid: "Y" | "N"
  declare blogTypeId: CreationOptional<string>
  declare category: NonAttribute<BlogType>
  declare translations: NonAttribute<BlogTranslation[]> // 自动维护
  declare readonly createdAt: NonAttribute<Date> // 自动维护
  declare readonly updatedAt: NonAttribute<Date> // 自动维护
}

Blog.init(
  {
    blogTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Sequelize 自动生成 v4 UUID
      primaryKey: true,
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
  },
  {
    sequelize: dbIns.sequelize,
    tableName: "blog",
    freezeTableName: true,
    timestamps: true,
  }
)
