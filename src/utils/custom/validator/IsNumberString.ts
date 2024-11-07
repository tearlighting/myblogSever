import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

@ValidatorConstraint({ name: "IsNumberString", async: false })
export class IsNumberString implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments): boolean {
    // console.log(value, validationArguments, "???")
    try {
      const res = Number(value)
      return !Number.isNaN(res)
    } catch (e) {
      return false
    }
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.value} is wrong}`
  }
}
