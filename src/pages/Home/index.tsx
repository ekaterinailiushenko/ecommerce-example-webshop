import { useEffect } from 'react'

import en from '../../i18n/en.json'
import { Products } from './components'
import { useProductsStore } from '../../stores'

export const Home = () => {
  const { isLoading, isError, getProducts } = useProductsStore(state => ({
    isLoading: state.isLoading,
    isError: state.isError,
    getProducts: state.getProducts,
  }))

  useEffect(() => {
    void getProducts()
  }, [getProducts])

  if (isLoading) {
    return <p>{en.global.loading}</p>
  }

  if (isError) {
    return <p>{en.products.errors.loadError}</p>
  }

  return (
    <div className="flex flex-1 flex-col">
      <Products />
    </div>
  )
}
