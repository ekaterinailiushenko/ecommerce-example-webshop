import { useEffect } from 'react'

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
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>There was an error loading the products</p>
  }

  return <Products />
}
