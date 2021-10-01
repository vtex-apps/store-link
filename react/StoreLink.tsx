import React from 'react'
import classnames from 'classnames'
import { Link } from 'vtex.render-runtime'
import { defineMessages, useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { formatIOMessage } from 'vtex.native-types'

import hasChildren from './modules/hasChildren'
import useButtonClasses, { Variant } from './modules/useButtonClasses'
import { useInterpolatedLink } from './modules/useInterpolatedLink'
import { useTitleAttr } from './modules/useTitleAttr'

type DisplayMode = 'anchor' | 'button'
type Size = 'small' | 'regular' | 'large'

export interface ButtonProps {
  variant: Variant
  size: Size
}

// https://stackoverflow.com/a/49725198/11274053
type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

interface AllProps {
  href?: string
  label: string
  target?: string
  scrollTo?: string
  escapeLinkRegex?: string
  children: React.ReactNode
  displayMode?: DisplayMode
  buttonProps?: Partial<ButtonProps>
  rel?: string
  title?: string
}

export type Props = RequireOnlyOne<AllProps, 'label' | 'children'>

defineMessages({
  labelTitle: {
    id: 'admin/editor.link.label.title',
    defaultMessage: '',
  },
})

export const defaultButtonProps: ButtonProps = {
  variant: 'primary',
  size: 'regular',
}

const CSS_HANDLES = ['link', 'label', 'childrenContainer', 'buttonLink']

function StoreLink(props: Props) {
  const {
    label,
    href,
    target,
    children,
    buttonProps = defaultButtonProps,
    scrollTo,
    displayMode = 'anchor',
    rel,
  } = props
  const { variant, size } = {
    ...defaultButtonProps,
    ...buttonProps,
  }
  const intl = useIntl()
  const handles = useCssHandles(CSS_HANDLES)
  const classes = useButtonClasses({
    variant,
    size,
  })
  const resolvedLink = useInterpolatedLink(href)

  const rootClasses = classnames(handles.link, {
    [`${handles.buttonLink} ${classes.container}`]: displayMode === 'button',
  })

  const labelClasses = classnames(handles.label, {
    [classes.label]: displayMode === 'button',
  })

  const scrollOptions = scrollTo ? { baseElementId: scrollTo } : undefined

  const localizedLabel = formatIOMessage({
    id: label,
    intl,
  })

  const title = useTitleAttr(props.title, label)

  return (
    <Link
      to={resolvedLink}
      target={target}
      className={rootClasses}
      scrollOptions={scrollOptions}
      rel={rel}
      {...{ title }}
    >
      {label && <span className={labelClasses}>{localizedLabel}</span>}
      {hasChildren(children) && (
        <div className={handles.childrenContainer}>{children}</div>
      )}
    </Link>
  )
}

StoreLink.schema = {
  title: 'Link',
}

export default StoreLink
