import React, { useState, useEffect } from 'react'
import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { ModalContext } from 'vtex.modal-layout'

interface Props {
  label: string
  href: string
  children: React.ReactNode
}

const { useModalDispatch } = ModalContext
const CSS_HANDLES = ['link', 'label', 'childrenContainer']

export default function StoreLink(props: Props) {
  const { label, href, children } = props
  const handles = useCssHandles(CSS_HANDLES)
  const modalDispatch = useModalDispatch()
  const [shouldReplaceUrl, setShouldReplaceUrl] = useState(
    Boolean(modalDispatch)
  )

  useEffect(() => {
    setShouldReplaceUrl(Boolean(modalDispatch))
  }, [modalDispatch])

  return (
    <Link to={href} className={handles.link} replace={shouldReplaceUrl}>
      {label && <span className={handles.label}>{label}</span>}
      {children && <div className={handles.childrenContainer}>{children}</div>}
    </Link>
  )
}
