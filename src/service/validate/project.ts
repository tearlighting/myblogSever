import { IsNotEmpty, IsNumberString, IsString, Length } from "class-validator"
import { BlogPagenation, TOC } from "./blog"

export class ProjectPagenation {
  @IsNumberString()
  page: number | string
  @IsNumberString()
  limit: number | string
}

export class ProjectObjectValidate implements IProjectObject {
  blogType: string
  //   @ValidateNested()
  toc: TOC[]
  @IsString()
  @IsNotEmpty()
  htmlContent: string

  id?: string
  @Length(1)
  @IsString()
  title?: string
  @Length(1)
  @IsString()
  description?: string
  @Length(1)
  @IsString()
  thumb?: string
  @IsNumberString()
  scanNumber?: string
  @Length(1)
  @IsString()
  commentNumber?: string
  createDate?: string
  isValid?: "Y" | "N"
}
