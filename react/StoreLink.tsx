import React, { useState, useEffect } from 'react'
import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { ModalContext } from 'vtex.modal-layout'

interface Props {
  label: string
  href: string
}

const { useModalDispatch } = ModalContext
const CSS_HANDLES = ['container', 'link']

export default function StoreLink(props: Props) {
  const { label, href } = props
  const handles = useCssHandles(CSS_HANDLES)
  const modalDispatch = useModalDispatch()
  const [shouldReplaceUrl, setShouldReplaceUrl] = useState(
    Boolean(modalDispatch)
  )

  useEffect(() => {
    setShouldReplaceUrl(Boolean(modalDispatch))
  }, [modalDispatch])

  return (
    <div className={`${handles.container} dib`}>
      <Link to={href} className={handles.link} replace={shouldReplaceUrl}>
        {label}
      </Link>
    </div>
  )
}
