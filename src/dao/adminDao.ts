import { Admin } from "./models/adminModel"
class AdminDao {
  async queryUser({ loginId, loginPwd }: Pick<IAdmin, "loginId" | "loginPwd">) {
    return await Admin.findOne({
      where: {
        loginId,
        loginPwd,
        isValid: "Y",
      },
    })
  }
  async updateUser(newInfo: Partial<IAdmin>, where: Partial<IAdmin>) {
    return await Admin.update(newInfo, {
      where,
    })
  }
}

export const AdminDaoInstance = new AdminDao()
