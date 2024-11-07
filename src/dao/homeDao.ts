import { Home } from "./models/homeModel"

class HomeDao {
  getAllBanners() {
    return Home.findAll()
  }
  getBannersById({ id }: Partial<IBanner>) {
    return Home.findOne({
      where: {
        //@ts-ignore
        id,
        isValid: "Y",
      },
    })
  }
  setBanners({ id, img, placeHolderImg, title, description }: Partial<IBanner>) {
    return Home.update(
      { img, placeHolderImg, title, description },
      {
        where: {
          //@ts-ignore
          id,
        },
      }
    )
  }
  addBanner({ img, placeHolderImg, title, description }: Partial<IBanner>) {
    return Home.create({
      img,
      placeHolderImg,
      title,
      description,
    })
  }
}

export const homeDaoInstance = new HomeDao()
