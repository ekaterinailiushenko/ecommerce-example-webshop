import { useEffect } from 'react'

import en from '../../i18n/en.json'
import { Products } from './components'
import { useProductContext } from '../../contexts/ProductContext/hook'

export const Home = () => {
  const { isLoading, isProductsError, getProducts } = useProductContext()

  useEffect(() => {
    void getProducts()
  }, [getProducts])

  if (isLoading) {
    return <p>{en.global.loading}</p>
  }

  if (isProductsError) {
    return <p>{en.products.errors.loadError}</p>
  }

  return (
    <div className="flex flex-1 flex-col">
      <Products />
    </div>
  )
}
