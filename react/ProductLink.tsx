import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { ModalContext } from 'vtex.modal-layout'
import { useProduct } from 'vtex.product-context'
import React, { useState, useEffect } from 'react'

import hasChildren from './modules/hasChildren'
import { AvailableContext } from './modules/mappings'
import interpolateLink from './modules/interpolateLink'

const { useModalDispatch } = ModalContext

interface Props {
  label: string
  href: string
  children: React.ReactNode
  target?: string
}

const CSS_HANDLES = ['link', 'label', 'childrenContainer'] as const

function ProductLink(props: Props) {
  const { label, href, children, target } = props
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
    // if the link is in a modal it should replace the url instead of just pushing a new one
    setShouldReplaceUrl(Boolean(modalDispatch))
  }, [modalDispatch])

  return target && target !== '_self' ? (
    <a target={target} href={resolvedLink} className={handles.link}>
      {label && <span className={handles.label}>{label}</span>}
      {hasChildren(children) && (
        <div className={handles.childrenContainer}>{children}</div>
      )}
    </a>
  ) : (
    <Link to={resolvedLink} className={handles.link} replace={shouldReplaceUrl}>
      {label && <span className={handles.label}>{label}</span>}
      {hasChildren(children) && (
        <div className={handles.childrenContainer}>{children}</div>
      )}
    </Link>
  )
}

ProductLink.schema = { title: 'Product Link' }

export default ProductLink
