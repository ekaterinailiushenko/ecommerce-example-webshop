import type { CartProduct } from '../stores/useCartStore'

export const calculateItemsInCart = (cartItems: CartProduct[]) => {
  return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
}

export const calculateTotal = (cartItems: CartProduct[]) => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
}

export const calculateTotalWithDelivery = (
  cartItems: CartProduct[],
  deliveryCosts: number
) => calculateTotal(cartItems) + deliveryCosts
