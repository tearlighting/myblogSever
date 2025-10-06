import { Project, ProjectTranslation } from "../models"
import { ProjectPagenation } from "@/service/validate/project"

class ProjectDao {
  async getPagenationProjects({ page, limit }: ProjectPagenation) {
    return Project.findAndCountAll({
      distinct: true,
      col: "id",
      offset: (+page - 1) * +limit,
      limit: +limit,
      where: {
        isValid: "Y",
      },
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: ProjectTranslation,
          as: "translations",
          required: false,
          where: {
            isValid: "Y",
          },
        },
      ],
    })
  }
  async createProject({ scanNumber, commentNumber, thumb }: Omit<IProject, keyof IBaseModel | "isValid">) {
    return Project.create({
      scanNumber,
      //   createDate,
      commentNumber,
      thumb,
      //   description,
      //   toc,
      //   htmlContent,
      //   title,
    })
  }
  async updateProject({ id, scanNumber, commentNumber, thumb }: Pick<IProject, "id" | "commentNumber" | "scanNumber" | "thumb">) {
    Project.update(
      {
        scanNumber,
        commentNumber,
        thumb,
      },
      {
        where: {
          id,
          isValid: "Y",
        },
      }
    )
  }
  async deleteProject({ id }: Pick<IProject, "id">) {
    Project.update(
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
  async getProjectById({ id }: Pick<IProject, "id">) {
    return Project.findOne({
      where: {
        id,
        isValid: "Y",
      },
      include: [
        {
          required: false,
          model: ProjectTranslation,
          as: "translations",
          where: {
            isValid: "Y",
          },
        },
      ],
    })
  }
}

export const projectDaoInstance = new ProjectDao()
