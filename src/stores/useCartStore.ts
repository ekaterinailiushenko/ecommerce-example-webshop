import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { ProductType } from './useProductsStore'

export type CartProduct = ProductType & { quantity: number }

type State = {
  userId: string | null
  cartItems: CartProduct[]
  deliveryCosts: number
}

type Action = {
  calculateItemsInCart: () => number
  calculateTotal: () => number
  calculateTotalWithDelivery: () => number
  addItemToCart: (item: ProductType) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  changeQuantity: (quantity: number, productId: string) => void
  removeItemFromCart: (productId: string) => void
  setUserId: (userId: string | null) => void
  clearCart: () => void
  loadCartForUser: () => void
}

export const useCartStore = create(
  persist<State & Action>(
    (set, get) => {
      const saveCartToStorage = () => {
        const userId = get().userId
        if (userId) {
          const userCartKey = `cart-items-${userId}`
          sessionStorage.setItem(userCartKey, JSON.stringify(get().cartItems))
        }
      }

      const deliveryCosts = 555

      const calculateItemsInCart = () =>
        get().cartItems.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        )

      const calculateTotal = () =>
        get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )

      const calculateTotalWithDelivery = () => calculateTotal() + deliveryCosts

      return {
        cartItems: [],
        userId: null,
        deliveryCosts,
        calculateItemsInCart,
        calculateTotal,
        calculateTotalWithDelivery,
        addItemToCart: item => {
          const itemExists = get().cartItems.find(
            cartItem => cartItem.product_id === item.product_id
          )

          if (itemExists) {
            if (typeof itemExists.quantity === 'number') {
              itemExists.quantity++
            }

            set({ cartItems: [...get().cartItems] })
          } else {
            set({ cartItems: [{ ...item, quantity: 1 }, ...get().cartItems] })
          }

          saveCartToStorage()
        },
        increaseQuantity: productId => {
          const itemExists = get().cartItems.find(
            cartItem => cartItem.product_id === productId
          )

          if (itemExists) {
            if (typeof itemExists.quantity === 'number') {
              itemExists.quantity++
            }

            set({ cartItems: [...get().cartItems] })
            saveCartToStorage()
          }
        },
        decreaseQuantity: productId => {
          const itemExists = get().cartItems.find(
            cartItem => cartItem.product_id === productId
          )

          if (itemExists) {
            if (typeof itemExists.quantity === 'number') {
              if (itemExists.quantity === 1) {
                const updatedCartItems = get().cartItems.filter(
                  item => item.product_id !== productId
                )
                set({ cartItems: updatedCartItems })
              } else {
                itemExists.quantity--
                set({ cartItems: [...get().cartItems] })
              }
              saveCartToStorage()
            }
          }
        },
        changeQuantity: (quantity, productId) => {
          const item = get().cartItems.find(
            cartItem => cartItem.product_id === productId
          )

          if (item) {
            if (quantity <= 0) {
              const updatedCartItems = get().cartItems.filter(
                cartItem => cartItem.product_id !== productId
              )
              set({ cartItems: updatedCartItems })
            } else {
              item.quantity = quantity
              set({ cartItems: [...get().cartItems] })
            }
            saveCartToStorage()
          }
        },
        removeItemFromCart: productId => {
          const itemExists = get().cartItems.find(
            cartItem => cartItem.product_id === productId
          )

          if (itemExists) {
            if (typeof itemExists.quantity === 'number') {
              const updatedCartItems = get().cartItems.filter(
                item => item.product_id !== productId
              )
              set({ cartItems: updatedCartItems })
              saveCartToStorage()
            }
          }
        },
        setUserId: userId => {
          set({ userId, cartItems: [] }) // Clear the cart and set the user ID
          get().loadCartForUser() // Load the cart for the new user
        },
        clearCart: () => {
          set({ cartItems: [] })
          const userId = get().userId
          if (userId) {
            const userCartKey = `cart-items-${userId}`
            sessionStorage.removeItem(userCartKey)
          }
        },
        loadCartForUser: () => {
          const userId = get().userId
          if (userId) {
            const userCartKey = `cart-items-${userId}`
            const storedCart = sessionStorage.getItem(userCartKey)
            if (storedCart) {
              set({ cartItems: JSON.parse(storedCart) })
            }
          }
        },
      }
    },
    {
      name: 'cart-items',
    }
  )
)
