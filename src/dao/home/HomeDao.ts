import { Home } from "../models"

class HomeDao {
  getAllBanners() {
    return Home.findAll({
      where: {
        isValid: "Y",
      },
    })
  }
  getBannersById({ id }: Pick<IHome, "id">) {
    return Home.findOne({
      where: {
        id,
        isValid: "Y",
      },
    })
  }
  updateBanner({ id, img, placeHolderImg, title, description }: Partial<IHome>) {
    return Home.update(
      { img, placeHolderImg, title, description },
      {
        where: {
          id,
          isValid: "Y",
        },
      }
    )
  }
  createBanner({ img, placeHolderImg, title, description }: Partial<IHome>) {
    return Home.create({
      img,
      placeHolderImg,
      title,
      description,
    })
  }
  deleteBanner({ id }: Pick<IHome, "id">) {
    return Home.update(
      {
        isValid: "N",
      },
      {
        where: {
          id,
          isValid: "Y",
        },
      }
    )
  }
}

export const homeDaoInstance = new HomeDao()
