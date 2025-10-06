import { homeDaoInstance } from "@/dao/home"
import { ValidateError } from "@/utils/errorHelper"

class HomeService {
  async getBanners() {
    try {
      const res = await homeDaoInstance.getAllBanners()
      return res.map((v) => {
        const { id, img, title, description } = v.dataValues as IHome
        return {
          id,
          bigImg: img,
          title,
          description,
        }
      })
    } catch (e) {
      throw e
    }
  }

  async updateBanner({ id, img, placeHolderImg, title, description }: IHome) {
    try {
      const row = await homeDaoInstance.getBannersById({ id })
      if (!row?.toJSON) {
        throw new ValidateError(`delete item dont exist`)
      } else {
        return homeDaoInstance.updateBanner({ id, img, placeHolderImg, title, description })
      }
    } catch (e) {
      throw e
    }
  }
  async createBanner({ img, placeHolderImg, title, description }: Partial<IHome>) {
    try {
      return await homeDaoInstance.createBanner({ img, placeHolderImg, title, description })
    } catch (e) {
      throw e
    }
  }
  async updateBanners(arr: IHome[] | IHome) {
    try {
      const normalized = Array.isArray(arr) ? arr : [arr]
      return await Promise.all(
        normalized.map((item) => {
          if (item.id) {
            return this.updateBanner(item)
          }
          return this.createBanner(item)
        })
      )
    } catch (e) {
      throw e
    }
  }
  async deleteBanner({ id }: { id: IHome["id"] }) {
    try {
      const row = await homeDaoInstance.getBannersById({ id })
      if (!row?.toJSON) {
        throw new ValidateError(`delete item dont exist`)
      } else {
        return homeDaoInstance.deleteBanner({ id })
      }
    } catch (e) {
      throw e
    }
  }
}

export const homeServiceInstance = new HomeService()
