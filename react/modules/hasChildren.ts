import React, { Children } from 'react'

export default function hasChildren(children: React.ReactNode) {
  if (!children) {
    return false
  }

  return Children.toArray(children).length > 0
}
