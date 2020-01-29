// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
const inferType = <T extends string>(...args: T[]) => args

const productVariables = inferType(
  'slug',
  'skuId',
  'department',
  'category1',
  'category2',
  'category3',
  'category4',
  'productId',
  'brand',
  'brandId'
)
export type ProductVariable = typeof productVariables[0]

export const PRODUCT_VARIABLES: ProductVariable[] = [
  'slug',
  'skuId',
  'department',
  'category1',
  'category2',
  'category3',
  'category4',
  'productId',
  'brand',
  'brandId',
]
