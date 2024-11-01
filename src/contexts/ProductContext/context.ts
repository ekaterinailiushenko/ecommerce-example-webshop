import { createContext } from 'react'

import type { Product, ProductDetails } from '../../api/types'

export namespace ProductContext {
  export interface Value {
    isError: boolean
    isLoading: boolean
    searchItem: string
    products: Product[]
    isProductDetailsLoading: boolean
    getProducts: () => Promise<void>
    getProductDetails: (id: string) => Promise<void>
    setSearchItem: (updatedSearchItem: string) => void
    filterProducts: (searchItem: string) => Promise<void>

    productDetails?: ProductDetails
  }
}

export const ProductContext = createContext<ProductContext.Value | null>(null)
