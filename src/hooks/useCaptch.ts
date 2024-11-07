import { create } from "svg-captcha"
export function useCaptch() {
  function createCapch() {
    return create({
      size: 4,
      color: true,
      ignoreChars: "iIl10o",
      noise: 6,
    })
  }
  return {
    createCapch,
  }
}
