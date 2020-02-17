import React, { useState, useEffect } from 'react'
import { Link } from 'vtex.render-runtime'
import { defineMessages } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { ModalContext } from 'vtex.modal-layout'

import hasChildren from './modules/hasChildren'

interface Props {
  label: string
  href: string
  children: React.ReactNode
  target?: string
}

defineMessages({
  labelTitle: {
    id: 'admin/editor.link.label.title',
    defaultMessage: '',
  },
})

const { useModalDispatch } = ModalContext
const CSS_HANDLES = ['link', 'label', 'childrenContainer']

function StoreLink(props: Props) {
  const { label, href, children, target } = props
  const handles = useCssHandles(CSS_HANDLES)
  const modalDispatch = useModalDispatch()
  const [shouldReplaceUrl, setShouldReplaceUrl] = useState(
    Boolean(modalDispatch)
  )

  useEffect(() => {
    setShouldReplaceUrl(Boolean(modalDispatch))
  }, [modalDispatch])

  return target && target !== '_self' ? (
    <a target={target} href={href} className={handles.link}>
      {label && <span className={handles.label}>{label}</span>}
      {hasChildren(children) && (
        <div className={handles.childrenContainer}>{children}</div>
      )}
    </a>
  ) : (
    <Link to={href} className={handles.link} replace={shouldReplaceUrl}>
      {label && <span className={handles.label}>{label}</span>}
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
