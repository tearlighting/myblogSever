import { homeDaoInstance } from "@/dao/home"
import { ValidateError } from "@/utils/errorHelper"

class HomeService {
  async getBanners() {
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
  }

  async updateBanner({ id, img, placeHolderImg, title, description }: IHome) {
    const row = (await homeDaoInstance.getBannersById({ id }))?.getDataValue
    if (row) {
      return homeDaoInstance.setBanners({ id, img, placeHolderImg, title, description })
    } else {
      throw new ValidateError(`delete item dont exist`)
    }
  }
  async addBanner({ img, placeHolderImg, title, description }: Partial<IHome>) {
    return homeDaoInstance.addBanner({ img, placeHolderImg, title, description })
  }
  async updateBanners(arr: IHome[] | IHome) {
    const normalized = Array.isArray(arr) ? arr : [arr]
    return Promise.all(
      normalized.map((item) => {
        if (item.id) {
          return this.updateBanner(item)
        }
        return this.addBanner(item)
      })
    )
  }
  async deleteBanner({ id }: { id: IHome["id"] }) {
    const row = (await homeDaoInstance.getBannersById({ id }))?.getDataValue
    if (row) {
      return homeDaoInstance.deleteBanner({ id })
    } else {
      throw new ValidateError(`delete item dont exist`)
    }
  }
}

export const homeServiceInstance = new HomeService()
