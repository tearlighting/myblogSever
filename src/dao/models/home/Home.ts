import { dbIns } from "../../db"
import { setModel } from "@/utils/sequelizeHelper"
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize"

export class Home extends Model<InferAttributes<Home>, InferCreationAttributes<Home>> implements IHome {
  declare id: CreationOptional<string>
  declare isValid: "Y" | "N"
  declare img: string
  declare placeHolderImg: string
  declare title: string
  declare description: string
  declare readonly createdAt: NonAttribute<Date> // 自动维护
  declare readonly updatedAt: NonAttribute<Date> // 自动维护
}

Home.init(
  {
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
  {
    sequelize: dbIns.sequelize,
    tableName: "home",
    freezeTableName: true,
  }
)
