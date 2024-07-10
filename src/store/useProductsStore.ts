import { create } from 'zustand'
import { getProducts } from '../api/productApi'

export type ProductType = {
  product_id: string
  name: string
  price: number
  image: string
}

type ProductsStore = {
  products: ProductType[]
  isLoading: boolean
  isError: boolean
  getProducts: () => Promise<void>
  filteredProducts: ProductType[]
  filterProducts: (searchTerm: string) => void
}

export const useProductsStore = create<ProductsStore>(set => ({
  products: [],
  isLoading: false,
  isError: false,
  getProducts: async () => {
    set({ isLoading: true })
    console.log('set isLoading true 1 time when home page mounts')
    try {
      const response = await getProducts()
      set({ products: response.data.products })
      set({ filteredProducts: response.data.products })
    } catch (err) {
      console.log('Error fetching products:', err)
      set({ isError: true })
    } finally {
      set({ isLoading: false })
      console.log('set isLoading false 2 time when products loaded')
    }
  },
  filteredProducts: [],
  filterProducts: (searchTerm: string) =>
    set(state => ({
      filteredProducts: state.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })),
}))
