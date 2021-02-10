import { useRuntime } from 'vtex.render-runtime'
import { useState } from 'react'

import interpolateLink from './interpolateLink'
import { AvailableContext } from './mappings'

interface Context {
  type: AvailableContext
  namespace?: string
  context: Record<string, unknown>
}

export const useInterpolatedLink = (
  href: string,
  escapeLinkRegex?: RegExp,
  extraContexts?: Context[]
) => {
  const [prevHref, setPrevHref] = useState<string | undefined>()
  const [resolvedLink, setResolvedLink] = useState('#')
  const {
    route: { queryString },
  } = useRuntime()

  const contexts = [
    {
      type: AvailableContext.queryString,
      namespace: 'queryString',
      context: queryString,
    },
    ...(extraContexts ?? []),
  ]

  if (prevHref !== href) {
    setPrevHref(href)

    const newLink = contexts.reduce((acc, contextInfo) => {
      return interpolateLink({
        link: acc,
        namespace: contextInfo.namespace,
        context: contextInfo.context,
        contextType: contextInfo.type,
        escapeLinkRegex,
      })
    }, href)

    setResolvedLink(newLink)
  }

  return resolvedLink
}
