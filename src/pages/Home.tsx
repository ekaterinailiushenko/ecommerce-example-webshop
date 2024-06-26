import { useEffect } from 'react'
import { Products } from '../components/Products'
import { useProductsStore } from '../store/useProductsStore'

export const Home = () => {
  const { isLoading, isError, getProducts } = useProductsStore(state => ({
    isLoading: state.isLoading,
    isError: state.isError,
    getProducts: state.getProducts,
  }))

  useEffect(() => {
    getProducts()
  }, [getProducts])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>There was an error loading the users</p>
  }

  return <Products />
}
