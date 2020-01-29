import { getMappingFn, AvailableContext } from './mappings'

interface Params {
  link: string
  context?: Record<string, any>
  contextType: AvailableContext
}

export default function interpolateLink(params: Params) {
  const { link, context, contextType } = params

  const mapValues = getMappingFn(contextType)
  const variables = mapValues(context)
  let resolvedLink = link

  for (const key of Object.keys(variables)) {
    const regex = new RegExp(`{${key}}`, 'g')
    resolvedLink = resolvedLink.replace(regex, variables[key])
  }

  return resolvedLink
}
