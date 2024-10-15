import { createContext } from 'react'

import type { Cart, Product } from '../../api/types'

export namespace CartContext {
  export interface Value {
    getCart: () => Promise<void>
    clearCart: () => Promise<void>
    addProductToCart: (productId: Product['product_id']) => Promise<void>
    deleteProductFromCart: (productId: Product['product_id'], removeAll?: boolean) => Promise<void>

    cartSummary?: Cart
  }
}

export const CartContext = createContext<CartContext.Value | null>(null)
