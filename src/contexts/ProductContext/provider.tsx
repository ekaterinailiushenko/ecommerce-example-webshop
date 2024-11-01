import { type ReactNode, useCallback, useMemo, useState } from 'react'

import { logger } from '../../utilities'
import { ProductContext } from './context'
import { productApi } from '../../api/productApi'
import type { Product, ProductDetails } from '../../api/types'

export const ProductContextProvider = ({ children }: { children: ReactNode }) => {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [productDetails, setProductDetails] = useState<ProductDetails>()

  const handleGetProducts = useCallback(async () => {
    setIsError(false)

    try {
      const products = await productApi.getProducts()
      setProducts(products)
    } catch (error) {
      logger.error(`Error in ProductContextProvider.handleGetProducts -> ${error}`)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleFilterProducts = useCallback(async (searchItem: string) => {
    setIsError(false)

    try {
      const filteredProducts = await productApi.getFilteredProducts(searchItem)
      setProducts(filteredProducts)
    } catch (error) {
      logger.error(`Error in ProductContextProvider.handleFilterProducts -> ${error}`)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleGetProductDetails = useCallback(async (id: string) => {
    setIsError(false)

    try {
      const productDetails = await productApi.getProductsDetails(id)
      setProductDetails(productDetails)
    } catch (error) {
      logger.error(`Error in ProductContextProvider.handleGetProductDetails -> ${error}`)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const value = useMemo(() => {
    const obj: ProductContext.Value = {
      isError,
      products,
      isLoading,
      productDetails,
      getProducts: handleGetProducts,
      filterProducts: handleFilterProducts,
      getProductDetails: handleGetProductDetails,
    }
    return obj
  }, [
    isError,
    products,
    isLoading,
    productDetails,
    handleGetProducts,
    handleFilterProducts,
    handleGetProductDetails,
  ])

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}
