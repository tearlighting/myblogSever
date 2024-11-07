import { AdminDaoInstance } from "@/dao/adminDao"
import { Admin } from "@/dao/models/adminModel"
import { ValidateError } from "@/utils/errorHelper"
import JWTHelperIns from "@/utils/jwtHelper"
import { ParamType, FuncIntercepter } from "@/hooks/useClassFunIntercepter"
import { AdminValidate } from "./validate/admin"
import md5 from "md5"

class AdminService {
  /**
   * 判断login成功与否
   * @param param0
   * @returns
   */
  @FuncIntercepter({}, { groups: ["checkUserValid"] })
  async isUserValidate(@ParamType(AdminValidate) { loginId, loginPwd }: Partial<IAdmin>) {
    loginPwd = md5(loginPwd)
    const res = await AdminDaoInstance.queryUser({ loginId, loginPwd })
    if (res && res.dataValues) {
      return { res: true, row: res.dataValues }
    }
    return { res: false }
  }
  /**
   * set Authorization header
   * @param response
   * @param param1
   */
  @FuncIntercepter()
  async setAuthorization(response: Express.Response, @ParamType(AdminValidate) { loginId, name, remember, role }: Partial<ILoginData>) {
    remember = remember ? +remember : 1
    JWTHelperIns.publish(response as any, { loginId, name, role }, 60 * 60 * 24 * remember)
  }
  @FuncIntercepter()
  async updateUserPwd<T extends IUpdateUserPwd>(@ParamType(AdminValidate) { loginId, loginPwd, oldPwd, name }: T) {
    const { res, row } = await this.isUserValidate({ loginId, loginPwd: oldPwd })
    if (res && row) {
      // console.log(row);
      const { id } = row as IAdmin
      return await AdminDaoInstance.updateUser(
        {
          loginPwd: md5(loginPwd),
          name,
        },
        { id }
      )
    } else {
      throw new ValidateError("old password error")
    }
  }
}

export const adminServiceInstance = new AdminService()
