import { createContext } from 'react'

import type { Cart, Product } from '../../api/types'

export namespace CartContext {
  export interface Value {
    loading: boolean
    cartSummary: Cart
    getCart: () => Promise<void>
    clearCart: () => Promise<void>
    deleteProductFromCart: (args: {
      removeAll?: boolean
      productId: Product['product_id']
    }) => Promise<void>
    addProductToCart: (productId: Product['product_id']) => Promise<void>
  }
}

export const CartContext = createContext<CartContext.Value | null>(null)
