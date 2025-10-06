import { FuncIntercepter, ParamType } from "@/hooks/useClassFunIntercepter"
import { AdminValidate } from "../validate/admin"
import { AdminDaoInstance } from "@/dao/admin"
import md5 from "md5"
import JWTHelperIns from "@/utils/jwtHelper"
import { ValidateError } from "@/utils/errorHelper"

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
    if (!res?.toJSON) {
      return { res: false }
    }
    return { res: true, row: res.toJSON() }
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
    try {
      const { res, row } = await this.isUserValidate({ loginId, loginPwd: oldPwd })
      if (res && row) {
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
    } catch (e) {
      throw e
    }
  }
}

export const adminServiceInstance = new AdminService()
