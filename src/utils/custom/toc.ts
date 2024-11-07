export function toc2String({ toc }: Partial<IBlogObject>) {
  return JSON.stringify(toc)
}

export function string2Toc(value: string): IBlogObject["toc"] {
  return JSON.parse(value)
}

import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

@ValidatorConstraint({ name: "TocValidate", async: false })
export class TocValidate implements ValidatorConstraintInterface {
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
