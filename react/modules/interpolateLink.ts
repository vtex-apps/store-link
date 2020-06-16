import findSpecificationLink from './findSpecification'
import { getMappingFn, AvailableContext } from './mappings'

interface Params {
  link: string
  namespace?: string
  context?: Record<string, any>
  contextType: AvailableContext
}

export default function interpolateLink(params: Params) {
  const { link, namespace, context, contextType } = params

  const mapValues = getMappingFn(contextType)
  const variables = mapValues(context)

  const specificationLink = findSpecificationLink(
    context?.product?.specificationGroups,
    link
  )
  let resolvedLink = link

  const productVariables = specificationLink
    ? { ...specificationLink, ...variables }
    : { ...variables }

  for (const key of Object.keys(productVariables)) {
    const regex = new RegExp(
      `{${namespace ? `${namespace}.${key}` : key}}`,
      'g'
    )
    resolvedLink = resolvedLink.replace(regex, productVariables[key])
  }
  // Replace not found variables with empty string
  if (namespace) {
    const missingKeys = new RegExp(`{${namespace}.(.*)}`)
    resolvedLink = resolvedLink.replace(missingKeys, () => '')
  }

  return resolvedLink
}
