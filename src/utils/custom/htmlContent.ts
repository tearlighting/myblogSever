export function htmlContent2String({ htmlContent }: Partial<IBlogObject>) {
  return JSON.stringify(htmlContent)
}

export function string2HtmlContent(value: string): IBlogObject["htmlContent"] {
  return JSON.parse(value) as any
}

import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

@ValidatorConstraint({ name: "HtmlContentValidate", async: false })
export class HtmlContentValidate implements ValidatorConstraintInterface {
  validate(value: Partial<IBlogObject>["toc"], validationArguments?: ValidationArguments): boolean {
    // console.log(value, validationArguments, "???")
    if (value) {
      return true
    }
    return false
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.value} is wrong}`
  }
}
