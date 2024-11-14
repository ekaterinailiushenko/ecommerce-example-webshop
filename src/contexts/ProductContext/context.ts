import { createContext } from 'react'

import type { Product, ProductDetails } from '../../api/types'

export namespace ProductContext {
  export interface Value {
    isLoading: boolean
    products: Product[]
    isProductsError: boolean
    isProductDetailsError: boolean
    isProductDetailsLoading: boolean
    getProducts: () => Promise<void>
    getProductDetails: (id: string) => Promise<void>
    filterProducts: (searchItem: string) => Promise<void>

    productDetails?: ProductDetails
  }
}

export const ProductContext = createContext<ProductContext.Value | null>(null)
