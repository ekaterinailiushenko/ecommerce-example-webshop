import { useContext } from 'react'

import { ProductContext } from './context'

export const useProductContext = () => {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error('useProductContext must be used within a ProductContextProvider')
  }
  return context
}
