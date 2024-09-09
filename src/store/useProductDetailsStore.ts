import { create } from 'zustand'
import { getProductDetails } from '../api/productApi'

export type ProductDetailsType = {
  product_id: string
  name: string
  price: number
  image: string
  description?: string
}

type State = {
  productDetails: ProductDetailsType | null
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
      set({ productDetails: response.data })
    } catch (err) {
      console.log('Error fetching product details:', err)
      set({ isError: true })
    } finally {
      set({ isLoading: false })
    }
  },
}))
