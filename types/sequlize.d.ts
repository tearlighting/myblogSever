type IsBranded<T, Brand extends symbol> = keyof NonNullable<T> extends keyof Omit<NonNullable<T>, Brand> ? false : true

type BrandedKeysOf<T, Brand extends symbol> = {
  [P in keyof T]-?: IsBranded<T[P], Brand> extends true ? P : never
}[keyof T]
