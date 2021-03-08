import { useRuntime } from 'vtex.render-runtime'
import { useEffect, useState } from 'react'
import type { RenderContext } from 'vtex.render-runtime'

import interpolateLink from './interpolateLink'
import { AvailableContext } from './mappings'
import type { Context } from '../typings/types'

export const useInterpolatedLink = (
  href?: string,
  escapeLinkRegex?: RegExp,
  extraContexts?: Context[]
) => {
  const [resolvedLink, setResolvedLink] = useState('#')
  const {
    route: { queryString },
  } = useRuntime() as RenderContext.RenderContext

  useEffect(() => {
    if (!href) {
      return
    }

    const contexts: Context[] = [
      {
        type: AvailableContext.queryString,
        namespace: 'queryString',
        context: queryString,
      },
      ...(extraContexts ?? []),
    ]

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
  }, [href, escapeLinkRegex, extraContexts, queryString])

  return resolvedLink
}
