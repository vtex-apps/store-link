import { searchSlugify } from '@vtex/slugify'
import type { ProductTypes } from 'vtex.product-context'

import { PRODUCT_VARIABLES, ProductVariable } from '../typings/types'

function mapCategories(rawCategories: string[]) {
  const categoriesSorted = rawCategories
    .slice()
    .sort((a, b) => a.length - b.length)

  return categoriesSorted
    .map(categories => {
      return categories
        .replace(/^\//, '')
        .replace(/\/$/, '')
        .split('/')
        .reverse()[0]
    })
    .filter(Boolean)
}

interface SpecificationGroup {
  originalName: string
  specifications?: Array<{ originalName?: string; values: string[] }>
}

function mapSpecifications(specificationGroups: SpecificationGroup[]) {
  const mappedSpecifications: Record<string, string> = {}
  specificationGroups.forEach(
    ({ originalName: groupName, specifications = [] }) => {
      specifications.forEach(({ originalName: specificationName, values }) => {
        const key = `specificationGroups.${groupName}.specifications.${specificationName}`
        const [value] = values
        mappedSpecifications[key] = value ?? ''
      })
    }
  )

  return mappedSpecifications
}

export function mapProductValues(
  context?: Partial<ProductTypes.ProductContextState>
) {
  const { product, selectedItem } = context ?? {}

  if (!product) {
    return {}
  }

  if (!selectedItem) {
    return {}
  }

  const categories = mapCategories(product.categories)
  const specifications = mapSpecifications(product.specificationGroups)
  const variables: Record<Partial<ProductVariable>, string | number> = {
    slug: product.linkText,
    skuId: selectedItem.itemId,
    department: categories[0],
    category1: categories[1],
    category2: categories[2],
    category3: categories[3],
    category4: categories[4],
    productId: product.productId,
    brand: searchSlugify(product.brand),
    brandId: product.brandId,
  }

  const output: Record<string, string> = specifications
  for (const key of PRODUCT_VARIABLES) {
    if (variables[key]) {
      if (typeof variables[key] === 'number') {
        output[key] = variables[key].toString()
      } else {
        output[key] = variables[key] as string
      }
    }
  }

  return output
}

function mapQueryStringValues(context?: Record<string, any>) {
  return context ?? {}
}

export enum AvailableContext {
  product = 'product',
  queryString = 'queryString',
}

export function getMappingFn(
  contextType: AvailableContext
): typeof mapProductValues | typeof mapQueryStringValues {
  switch (contextType) {
    case AvailableContext.product:
      return mapProductValues
    case AvailableContext.queryString:
      return mapQueryStringValues
    default:
      return () => ({})
  }
}
