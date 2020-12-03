import React from 'react'

const fakeRuntime = {
  account: 'vtex',
  getSettings: () => ({
    storeName: 'Store Name',
    titleTag: 'Store TitleTag',
  }),
  route: {
    queryString: '',
  },
  culture: { currency: 'BRL', locale: 'pt-BR', country: 'BRA' },
}

export const useRuntime = () => {
  return fakeRuntime
}

export function Link({ to, children, label = children }: any) {
  return <a href={to}>{label}</a>
}
