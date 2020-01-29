import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { ModalContext } from 'vtex.modal-layout'
import { useProduct } from 'vtex.product-context'
import React, { useState, useEffect } from 'react'

import { AvailableContext } from './modules/mappings'
import interpolateLink from './modules/interpolateLink'

const { useModalDispatch } = ModalContext

interface Props {
  label: string
  href: string
}

const CSS_HANDLES = ['container', 'link'] as const

export default function StoreLink(props: Props) {
  const { label, href } = props
  const productContext = useProduct()
  const handles = useCssHandles(CSS_HANDLES)
  const [prevHref, setPrevHref] = useState()
  const [resolvedLink, setResolvedLink] = useState('#')
  const modalDispatch = useModalDispatch()
  const [shouldReplaceUrl, setShouldReplaceUrl] = useState(
    Boolean(modalDispatch)
  )

  if (prevHref !== href) {
    setPrevHref(href)
    const newLink = interpolateLink({
      link: href,
      context: productContext,
      contextType: AvailableContext.product,
    })
    setResolvedLink(newLink)
  }

  useEffect(() => {
    // if the link is in a modal it should replace the url instead of just push a new one
    setShouldReplaceUrl(Boolean(modalDispatch))
  }, [modalDispatch])

  return (
    <div className={`${handles.container} dib`}>
      <Link
        to={resolvedLink}
        className={handles.link}
        replace={shouldReplaceUrl}
      >
        {label}
      </Link>
    </div>
  )
}
