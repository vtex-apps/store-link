import React from 'react'
import { screen, render } from '@vtex/test-tools/react'
import { useProduct } from 'vtex.product-context'

import ProductLink from '../ProductLink'

const mockedUseProduct = useProduct as jest.Mock

function mockProduct({ brand, specificationGroups }: any) {
  mockedUseProduct.mockImplementation(() => {
    return {
      selectedItem: { itemId: 'itemId' },
      product: {
        categories: ['category1', 'category2'],
        specificationGroups,
        linkText: 'linkText',
        productId: 'productId',
        brand,
        brandId: 'brandId',
      },
    }
  })
}

test('slugifies interpolated values', () => {
  mockProduct({
    brand: 'brand name with lots of spaces',
    specificationGroups: [
      {
        originalName: 'specGroup1',
        specifications: [
          {
            originalName: 'spec1',
            values: ['Some spec properties with lots of spaces'],
          },
        ],
      },
    ],
  })

  render(<ProductLink href="/custom-link-{brand}" label="See brand" />)
  render(
    <ProductLink
      href="/{specificationGroups.specGroup1.specifications.spec1}"
      label="See the thing"
    />
  )

  expect(screen.getByText('See brand').closest('a')).toHaveAttribute(
    'href',
    '/custom-link-brand-name-with-lots-of-spaces'
  )
  expect(screen.getByText('See the thing').closest('a')).toHaveAttribute(
    'href',
    '/some-spec-properties-with-lots-of-spaces'
  )
})
