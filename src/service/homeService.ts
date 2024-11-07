import { homeDaoInstance } from "@/dao/homeDao"
import { ValidateError } from "@/utils/errorHelper"

class HomeService {
  async getBanners() {
    const res = await homeDaoInstance.getAllBanners()
    return res.map((v) => {
      const { id, img, title, description } = v.dataValues as IBanner
      return {
        id,
        bigImg: img,
        title,
        description,
      }
    })
  }

  async updateBanner({ id, img, placeHolderImg, title, description }: IBanner) {
    const row = (await homeDaoInstance.getBannersById({ id }))?.getDataValue
    if (row) {
      return homeDaoInstance.setBanners({ id, img, placeHolderImg, title, description })
    } else {
      throw new ValidateError(`delete item dont exist`)
    }
  }
  async addBanner({ img, placeHolderImg, title, description }: Partial<IBanner>) {
    return homeDaoInstance.addBanner({ img, placeHolderImg, title, description })
  }
  async updateBanners(arr: IBanner[]) {
    return Promise.all(
      arr.map((item) => {
        if (item.id) {
          return this.updateBanner(item)
        }
        return this.addBanner(item)
      })
    )
  }
}

export const homeServiceInstance = new HomeService()
