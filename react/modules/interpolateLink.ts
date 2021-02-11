import { getMappingFn, AvailableContext } from './mappings'

interface Params {
  link: string
  namespace?: string
  context?: Record<string, any>
  contextType: AvailableContext
  escapeLinkRegex?: RegExp
}

export default function interpolateLink(params: Params) {
  const { link, namespace, context, contextType, escapeLinkRegex } = params

  const mapValues = getMappingFn(contextType)
  const variables = mapValues(context)

  let resolvedLink = link

  for (const key of Object.keys(variables)) {
    let newKey = key
    if (escapeLinkRegex) {
      newKey = key.replace(escapeLinkRegex, '')
    }
    const regex = new RegExp(
      `{${namespace ? `${namespace}.${newKey}` : newKey}}`,
      'g'
    )

    // we slugify the context value so we don't end up with invalid characters on the URL
    resolvedLink = resolvedLink.replace(regex, variables[key])
  }
  // Replace not found variables with empty string
  if (namespace) {
    const missingKeys = new RegExp(`{${namespace}.(.*)}`)
    resolvedLink = resolvedLink.replace(missingKeys, () => '')
  }

  return resolvedLink
}
