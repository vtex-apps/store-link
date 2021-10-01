import { useIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'

/**
 * @export
 * @description Validates if the title attribute must be equal to the link text by the `label` prop.
 * @param title The link title.
 * @param label The link text.
 * @return The title atribute.
 * @version 1.0.0
 */
export const useTitleAttr = (title?: string, label = '') => {
  const intl = useIntl()
  const titleAttr = formatIOMessage({ id: title, intl }, { label }) as string

  // Returns `undefined` if it is an empty title to not render the attribute.
  return titleAttr || undefined
}
