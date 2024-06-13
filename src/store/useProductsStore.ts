import { create } from 'zustand'
import { getProducts } from '../api/products'

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
    try {
      const response = await getProducts()
      set({ products: response.data.products })
      set({ filteredProducts: response.data.products })
    } catch (err) {
      console.log('Error fetching products:', err)
      set({ isError: true })
    } finally {
      set({ isLoading: false })
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
