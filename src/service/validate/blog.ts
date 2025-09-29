import { HtmlContentValidate } from "@/utils/custom/htmlContent"
import { TocValidate } from "@/utils/custom/toc"
import { IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Validate, ValidateNested } from "class-validator"

class BlogTypeValidate implements Omit<IBlogType, keyof IBaseModel> {
  id: string
  @Length(1)
  @IsString()
  name: string
  count: number

  @IsNumber()
  order: number
  isValid: "Y" | "N"
}

class BlogObjectValidate implements Partial<IBlog> {
  blogType: string
  //   @ValidateNested()

  id?: string
  @Length(1)
  @IsString()
  thumb?: string
  scanNumber?: string
  commentNumber?: string
  blogTypeId: string

  isValid?: "Y" | "N"
}
class BlogPagenation {
  @IsNotEmpty()
  id: string | number
  @IsNumberString()
  page: number | string
  @IsNumberString()
  limit: number | string
}
class TOC implements ITOC {
  @IsNotEmpty()
  @IsString()
  name: string
  @IsNotEmpty()
  @IsString()
  anchor: string
  @IsNotEmpty()
  @IsString()
  tag: string
  //   @ValidateNested()
  children: TOC[]
  constructor({ name, anchor, tag, children = [] }: Partial<ITOC>) {
    this.anchor = anchor
    this.name = name
    this.tag = tag
    this.children = children
  }
}
export { BlogTypeValidate, BlogObjectValidate, BlogPagenation, TOC }
