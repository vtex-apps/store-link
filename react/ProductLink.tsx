import React, { useState, useEffect } from 'react'
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
    children,
    target,
    displayMode = 'anchor',
    buttonProps = defaultButtonProps,
  } = props
  const productContext = useProduct()
  const handles = useCssHandles(CSS_HANDLES)
  const resolvedLink = useInterpolatedLink(href, [
    {
      type: AvailableContext.product,
      context: productContext,
    },
  ])
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

  const handlePrevent = (e: React.MouseEvent) =>{
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  return (
    <div onClick={handlePrevent} className={handles.linkContainer}>
    <Link
      target={target}
      to={resolvedLink}
      className={rootClasses}
      replace={shouldReplaceUrl}
      onClick={handlePrevent}
    >
      {label && <span className={labelClasses}>{label}</span>}
      {hasChildren(children) && displayMode === 'anchor' && (
        <div className={handles.childrenContainer}>{children}</div>
      )}
    </Link>
    </div>
  )
}

ProductLink.schema = { title: 'admin/editor.product-link.title' }

export default ProductLink
