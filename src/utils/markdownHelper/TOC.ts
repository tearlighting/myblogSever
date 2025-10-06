import { IsNotEmpty, IsString } from "class-validator"

export class TOC implements ITOC {
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
