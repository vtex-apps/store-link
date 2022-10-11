import React, { useMemo } from 'react'
import classnames from 'classnames'
import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { formatIOMessage } from 'vtex.native-types'
import { useIntl } from 'react-intl'

import { Props, defaultButtonProps } from './StoreLink'
import hasChildren from './modules/hasChildren'
import { AvailableContext } from './modules/mappings'
import useButtonClasses from './modules/useButtonClasses'
import { useInterpolatedLink } from './modules/useInterpolatedLink'

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
    rel,
  } = props

  const intl = useIntl()
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

  const localizedLabel = formatIOMessage({
    id: label,
    intl,
  })

  const {
    size = defaultButtonProps.size,
    variant = defaultButtonProps.variant,
  } = buttonProps
  const classes = useButtonClasses({ variant, size })

  const rootClasses = classnames(handles.link, {
    [`${handles.buttonLink} ${classes.container}`]: displayMode === 'button',
  })

  const labelClasses = classnames(handles.label, {
    [classes.label]: displayMode === 'button',
  })

  const handlePrevent = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  return (
    <Link
      target={target}
      to={resolvedLink}
      className={rootClasses}
      rel={rel}
      onClick={handlePrevent}
    >
      {label && <span className={labelClasses}>{localizedLabel}</span>}
      {hasChildren(children) && displayMode === 'anchor' && (
        <div className={handles.childrenContainer}>{children}</div>
      )}
    </Link>
  )
}

ProductLink.schema = { title: 'admin/editor.product-link.title' }

export default ProductLink
