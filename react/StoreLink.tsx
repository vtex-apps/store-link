import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { Link } from 'vtex.render-runtime'
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { ModalContext } from 'vtex.modal-layout'
import { formatIOMessage } from 'vtex.native-types'

import hasChildren from './modules/hasChildren'
import useButtonClasses, { Variant } from './modules/useButtonClasses'
import { useInterpolatedLink } from './modules/useInterpolatedLink'

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

interface AllProps extends InjectedIntlProps {
  href: string
  label: string
  target?: string
  scrollTo?: string
  children: React.ReactNode
  displayMode?: DisplayMode
  buttonProps?: Partial<ButtonProps>
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

const { useModalDispatch } = ModalContext
const CSS_HANDLES = ['link', 'label', 'childrenContainer', 'buttonLink']

function StoreLink(props: Props) {
  const {
    label,
    href,
    target,
    children,
    buttonProps = defaultButtonProps,
    scrollTo,
    intl,
    displayMode = 'anchor',
  } = props
  const { variant, size } = {
    ...defaultButtonProps,
    ...buttonProps,
  }
  const handles = useCssHandles(CSS_HANDLES)
  const modalDispatch = useModalDispatch()
  const classes = useButtonClasses({ variant, size })
  const resolvedLink = useInterpolatedLink(href)

  const [shouldReplaceUrl, setShouldReplaceUrl] = useState(
    Boolean(modalDispatch)
  )

  useEffect(() => {
    setShouldReplaceUrl(Boolean(modalDispatch))
  }, [modalDispatch])

  const rootClasses = classnames(handles.link, {
    [`${handles.buttonLink} ${classes.container}`]: displayMode === 'button',
  })

  const labelClasses = classnames(handles.label, {
    [classes.label]: displayMode === 'button',
  })

  const scrollOptions = scrollTo ? { baseElementId: scrollTo } : undefined

  const localizedLabel = formatIOMessage({ id: label, intl })

  return (
    <Link
      to={resolvedLink}
      target={target}
      className={rootClasses}
      replace={shouldReplaceUrl}
      scrollOptions={scrollOptions}
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

export default injectIntl(StoreLink)
