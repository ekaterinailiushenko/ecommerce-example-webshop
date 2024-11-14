import { type ReactNode, useCallback, useMemo, useState } from 'react'

import { logger } from '../../utilities'
import { ProductContext } from './context'
import { productApi } from '../../api/productApi'
import type { Product, ProductDetails } from '../../api/types'

export const ProductContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isProductsError, setIsProductsError] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [productDetails, setProductDetails] = useState<ProductDetails>()
  const [isProductDetailsError, setIsProductDetailsError] = useState(false)
  const [isProductDetailsLoading, setIsProductDetailsLoading] = useState(false)

  const handleGetProducts = useCallback(async () => {
    setIsProductsError(false)
    setIsLoading(true)

    try {
      const products = await productApi.getProducts()
      setProducts(products)
    } catch (error) {
      logger.error(`Error in ProductContextProvider.handleGetProducts -> ${error}`)
      setIsProductsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleFilterProducts = useCallback(async (searchItem: string) => {
    setIsProductsError(false)
    setIsLoading(true)

    try {
      const filteredProducts = await productApi.getFilteredProducts(searchItem)
      setProducts(filteredProducts)
    } catch (error) {
      logger.error(`Error in ProductContextProvider.handleFilterProducts -> ${error}`)
      setIsProductsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleGetProductDetails = useCallback(async (id: string) => {
    setIsProductDetailsError(false)
    setIsProductDetailsLoading(true)

    try {
      const productDetails = await productApi.getProductDetails(id)
      setProductDetails(productDetails)
    } catch (error) {
      logger.error(`Error in ProductContextProvider.handleGetProductDetails -> ${error}`)
      setIsProductDetailsError(true)
    } finally {
      setIsProductDetailsLoading(false)
    }
  }, [])

  const value = useMemo(() => {
    const obj: ProductContext.Value = {
      products,
      isLoading,
      productDetails,
      isProductsError,
      isProductDetailsError,
      isProductDetailsLoading,
      getProducts: handleGetProducts,
      filterProducts: handleFilterProducts,
      getProductDetails: handleGetProductDetails,
    }
    return obj
  }, [
    products,
    isLoading,
    productDetails,
    isProductsError,
    handleGetProducts,
    handleFilterProducts,
    isProductDetailsError,
    isProductDetailsLoading,
    handleGetProductDetails,
  ])

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}
