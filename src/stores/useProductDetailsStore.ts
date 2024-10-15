import { create } from 'zustand'

import { logger } from '../utilities'
import { getProductDetails } from '../api/productApi'
import type { ProductDetails } from '../api/types'

type State = {
  productDetails: ProductDetails | null
  isLoading: boolean
  isError: boolean
  getProductDetails: (id: string) => Promise<void>
}

type Action = {
  getProductDetails: (id: string) => Promise<void>
}

export const useProductDetailsStore = create<State & Action>(set => ({
  productDetails: null,
  isLoading: false,
  isError: false,
  getProductDetails: async id => {
    set({ isLoading: true })

    try {
      const response = await getProductDetails(id)
      set({ productDetails: response })
    } catch (err) {
      logger.error('Error fetching product details:', err)
      set({ isError: true })
    } finally {
      set({ isLoading: false })
    }
  },
}))
