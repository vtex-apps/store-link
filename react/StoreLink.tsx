import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { Link } from 'vtex.render-runtime'
import { defineMessages } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { ModalContext } from 'vtex.modal-layout'

import hasChildren from './modules/hasChildren'
import useButtonClasses, { Variant } from './modules/useButtonClasses'
import { useInterpolatedLink } from './modules/useInterpolatedLink'

type DisplayMode = 'anchor' | 'button'
type Size = 'small' | 'regular' | 'large'

export interface ButtonProps {
  variant: Variant
  size: Size
}

export interface Props {
  label: string
  href: string
  children: React.ReactNode
  target?: string
  displayMode?: DisplayMode
  buttonProps: Partial<ButtonProps>
}

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

  return (
    <Link
      to={resolvedLink}
      target={target}
      className={rootClasses}
      replace={shouldReplaceUrl}
    >
      {label && <span className={labelClasses}>{label}</span>}
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
