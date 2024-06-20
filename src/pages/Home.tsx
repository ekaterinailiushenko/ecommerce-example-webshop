import { useEffect } from 'react'
import { useProductsStore } from '../store/useProductsStore'
import { ProductsList } from '../components/ProductsList'

export const Home = () => {
  const { loading, error, getProducts, filteredProducts } = useProductsStore(
    state => {
      return {
        loading: state.isLoading,
        error: state.isError,
        getProducts: state.getProducts,
        filteredProducts: state.filteredProducts,
      }
    }
  )

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>There was an error loading the users</p>}
      {!loading && !error && <ProductsList products={filteredProducts} />}
    </div>
  )
}
