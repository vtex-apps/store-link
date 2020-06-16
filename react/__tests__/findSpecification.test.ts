import findSpecificationLink from '../modules/findSpecification'
import { PRODUCT_VARIABLES } from '../typings/types'

const mockedSpecificationGroups = [
  {
    name: 'App Data',
    specifications: [
      {
        name: 'google',
        values: ['http://www.google.com/'],
      },
      {
        name: 'mozila',
        values: ['https://developer.mozilla.org/'],
      },
      {
        name: '.linkedin',
        values: ['https://www.linkedin.com/'],
      },
    ],
  },
  {
    name: 'Storeframework',
  },
  {
    name: '.groupTest',
    specifications: [
      {
        name: '.test',
        values: ['test'],
      },
      {
        name: 'test',
        values: ['test'],
      },
      {
        name: 'test2',
        values: [],
      },
    ],
  },
]

describe('Specification Group Scenarios', () => {
  it('Should find the link', () => {
    const input = '{specificationGroups.App Data.specifications.google}'
    const output = {
      'specificationGroups.App Data.specifications.google':
        'http://www.google.com/',
    }
    expect(findSpecificationLink(mockedSpecificationGroups, input)).toEqual(
      output
    )
  })

  it('Should find the link if group name starts with .', () => {
    const input = '{specificationGroups..groupTest.specifications.test}'
    const output = {
      'specificationGroups..groupTest.specifications.test': 'test',
    }
    expect(findSpecificationLink(mockedSpecificationGroups, input)).toEqual(
      output
    )
  })

  it('Should find the link if specification name starts with .', () => {
    const input = '{specificationGroups.App Data.specifications..linkedin}'
    const output = {
      'specificationGroups.App Data.specifications..linkedin':
        'https://www.linkedin.com/',
    }
    expect(findSpecificationLink(mockedSpecificationGroups, input)).toEqual(
      output
    )
  })

  it('Should find the link if group and specification names start with .', () => {
    const input = '{specificationGroups..groupTest.specifications..test}'
    const output = {
      'specificationGroups..groupTest.specifications..test': 'test',
    }
    expect(findSpecificationLink(mockedSpecificationGroups, input)).toEqual(
      output
    )
  })

  it('Should not find the link if group name does not exist', () => {
    const input = '{specificationGroups.AppStore.specifications.google}'
    const output = null
    expect(findSpecificationLink(mockedSpecificationGroups, input)).toEqual(
      output
    )
  })

  it('Should not find the link if specification name does not exist', () => {
    const input = '{specificationGroups.App Data.specifications.facebook}'
    const output = null
    expect(findSpecificationLink(mockedSpecificationGroups, input)).toEqual(
      output
    )
  })

  it('Should not find the link if group does not have specifications', () => {
    const input = '{specificationGroups.Storeframework.specifications.store}'
    const output = null
    expect(findSpecificationLink(mockedSpecificationGroups, input)).toEqual(
      output
    )
  })

  it('Should not find the link if specification does not have value', () => {
    const input = '{specificationGroups..groupTest.specifications.test2}'
    const output = null
    expect(findSpecificationLink(mockedSpecificationGroups, input)).toEqual(
      output
    )
  })

  it('Should not find the link if url match with any product variable', () => {
    const output = null

    PRODUCT_VARIABLES.forEach((productVariable: string) => {
      const input = `{${productVariable}}`
      expect(findSpecificationLink(mockedSpecificationGroups, input)).toEqual(
        output
      )
    })
  })
})
