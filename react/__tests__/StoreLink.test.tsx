import React from 'react'
import { screen, render } from '@vtex/test-tools/react'

import StoreLink from '../StoreLink'

test('StoreLink Component', () => {
  render(<StoreLink href="/custom-link" label="View More" title="View More" />)

  const link = screen.getByTitle('View More')

  expect(link).toBeInTheDocument()
  expect(link).toHaveTextContent('View More')
  expect(link).toHaveAttribute('href', '/custom-link')
  expect(link).toHaveAttribute('title', 'View More')
})
