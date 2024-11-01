import { createContext } from 'react'

import type { Product, ProductDetails } from '../../api/types'

export namespace ProductContext {
  export interface Value {
    isError: boolean
    isLoading: boolean
    products: Product[]
    getProducts: () => Promise<void>
    filterProducts: (searchItem: string) => void
    getProductDetails: (id: string) => Promise<void>

    productDetails?: ProductDetails
  }
}

export const ProductContext = createContext<ProductContext.Value | null>(null)
