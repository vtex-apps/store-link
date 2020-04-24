import { useMemo } from 'react'
import classnames from 'classnames'

import { ButtonProps } from '../StoreLink'

export type Variant = 'primary' | 'secondary'

interface Options {
  variant?: Variant
  disabled?: boolean
  size?: ButtonProps['size']
}

const LINK_CLASSES = 'inline-flex items-center no-underline'
const BASE_CONTAINER_CLASSES = 'bw1 fw5 ba v-mid pa0 lh-solid br2'
const LABEL_BASE = 'w-100 tc'

const PRIMARY_ENABLED =
  'bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary'
const PRIMARY_DISABLED = 'bg-disabled b--muted-5 c-on-disabled'

const SECONDARY_ENABLED =
  'bg-action-secondary b--action-secondary c-on-action-secondary hover-bg-action-secondary hover-b--action-secondary hover-c-on-action-secondary'

const SMALL = 'min-h-small t-action--small'
const REGULAR = 'min-h-regular t-action'
const LARGE = 'min-h-large t-action--large'
const LABEL_SMALL = 'ph5'
const LABEL_REGULAR = 'ph6'
const LABEL_LARGE = 'ph7'

function getClassesByVariant(variant: Variant, disabled: boolean) {
  let container

  // eslint-disable-next-line default-case
  switch (variant) {
    case 'primary':
      container = disabled ? PRIMARY_DISABLED : PRIMARY_ENABLED
      break
    case 'secondary':
      container = SECONDARY_ENABLED
      break
  }

  return { container }
}

function getClassesBySize(size: ButtonProps['size']) {
  let container
  let label

  switch (size) {
    case 'small':
      container = SMALL
      label = LABEL_SMALL
      break
    case 'large':
      container = LARGE
      label = LABEL_LARGE
      break
    default:
      container = REGULAR
      label = LABEL_REGULAR
      break
  }

  return { container, label }
}

export default function useButtonClasses(options: Options) {
  return useMemo(() => {
    const { variant = 'primary', disabled = false, size = 'regular' } = options
    const variantClasses = getClassesByVariant(variant, disabled)
    const sizeClasses = getClassesBySize(size)
    const classes = {
      container: classnames(
        BASE_CONTAINER_CLASSES,
        LINK_CLASSES,
        variantClasses.container,
        sizeClasses.container
      ),
      label: classnames(LABEL_BASE, sizeClasses.label),
    }

    return classes
  }, [options])
}
