import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from '../api/products'

export const useGetProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/list`)
        setProducts(response.data.products)
      } catch (err) {
        console.log('Error fetching products:', err)
        console.log(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [])

  return { products, loading, error }
}
