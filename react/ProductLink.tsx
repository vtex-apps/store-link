import React, { useState, useEffect, useMemo } from 'react'
import classnames from 'classnames'
import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { ModalContext } from 'vtex.modal-layout'
import { useProduct } from 'vtex.product-context'

import { Props, defaultButtonProps } from './StoreLink'
import hasChildren from './modules/hasChildren'
import { AvailableContext } from './modules/mappings'
import useButtonClasses from './modules/useButtonClasses'
import { useInterpolatedLink } from './modules/useInterpolatedLink'

const { useModalDispatch } = ModalContext

const CSS_HANDLES = [
  'link',
  'label',
  'childrenContainer',
  'buttonLink',
] as const

function ProductLink(props: Props) {
  const {
    label,
    href,
    escapeLinkRegex,
    children,
    target,
    displayMode = 'anchor',
    buttonProps = defaultButtonProps,
  } = props
  const productContext = useProduct()
  const handles = useCssHandles(CSS_HANDLES)

  const extraContexts = useMemo(() => {
    return [
      {
        type: AvailableContext.product,
        context: productContext,
      },
    ]
  }, [productContext])

  const memoizedEscapeLinkRegex = useMemo(() => {
    if (!escapeLinkRegex) {
      return undefined
    }

    return new RegExp(escapeLinkRegex, 'g')
  }, [escapeLinkRegex])

  const resolvedLink = useInterpolatedLink(
    href,
    memoizedEscapeLinkRegex,
    extraContexts
  )

  const modalDispatch = useModalDispatch()

  const {
    size = defaultButtonProps.size,
    variant = defaultButtonProps.variant,
  } = buttonProps
  const classes = useButtonClasses({ variant, size })
  const [shouldReplaceUrl, setShouldReplaceUrl] = useState(
    Boolean(modalDispatch)
  )

  useEffect(() => {
    // if the link is in a modal it should replace the url instead of just pushing a new one
    setShouldReplaceUrl(Boolean(modalDispatch))
  }, [modalDispatch])

  const rootClasses = classnames(handles.link, {
    [`${handles.buttonLink} ${classes.container}`]: displayMode === 'button',
  })

  const labelClasses = classnames(handles.label, {
    [classes.label]: displayMode === 'button',
  })

  return (
    <Link
      target={target}
      to={resolvedLink}
      className={rootClasses}
      replace={shouldReplaceUrl}
    >
      {label && <span className={labelClasses}>{label}</span>}
      {hasChildren(children) && displayMode === 'anchor' && (
        <div className={handles.childrenContainer}>{children}</div>
      )}
    </Link>
  )
}

ProductLink.schema = { title: 'admin/editor.product-link.title' }

export default ProductLink
