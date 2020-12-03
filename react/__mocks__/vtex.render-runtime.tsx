import React from 'react'

export const useRuntime = () => {
  return {
    account: 'vtex',
    route: {
      queryString: '',
    },
    culture: { currency: 'BRL', locale: 'pt-BR', country: 'BRA' },
  }
}

export function Link({ to, children, label = children }: any) {
  return <a href={to}>{label}</a>
}
