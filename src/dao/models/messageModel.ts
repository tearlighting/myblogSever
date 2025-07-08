import { setModel } from "@/utils/sequelizeHelper"
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"

class MessageModel extends Model<InferAttributes<MessageModel>, InferCreationAttributes<MessageModel>> implements IMessage {
  declare nickName: string
  declare content: string
  declare avatar: string
  declare isValid: "Y" | "N"
}

const messageSetting = setModel({
  model: MessageModel,
  attributes: {
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
  options: {
    tableName: "message",
    freezeTableName: true, // 防止 Sequelize 自动修改表名
  },
})

export { messageSetting, MessageModel }
