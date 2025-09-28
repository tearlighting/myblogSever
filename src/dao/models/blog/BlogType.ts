import { dbIns } from "@/dao/db"
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize"

export class BlogType extends Model<InferAttributes<BlogType>, InferCreationAttributes<BlogType>> implements IBlogType {
  declare id: CreationOptional<string>
  declare name: string
  declare count: number
  declare order: number
  declare isValid: "Y" | "N"
  declare readonly createdAt: NonAttribute<Date> // 自动维护
  declare readonly updatedAt: NonAttribute<Date> // 自动维护
}

BlogType.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
  {
    sequelize: dbIns.sequelize,
    tableName: "blogtype",
    freezeTableName: true,
    timestamps: true,
  }
)
