import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProductType } from './useProductsStore'

type CartProduct = ProductType & { quantity: number }

type CartStore = {
  userId: string | null
  cartItems: CartProduct[]
  addItemToCart: (item: ProductType) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  removeItemFromCart: (productId: string) => void
  setUserId: (userId: string | null) => void
  clearCart: () => void
  loadCartForUser: () => void
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => {
      const saveCartToStorage = () => {
        const userId = get().userId
        if (userId) {
          const userCartKey = `cart-items-${userId}`
          sessionStorage.setItem(userCartKey, JSON.stringify(get().cartItems))
        }
      }

      return {
        cartItems: [],
        userId: null,
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
            set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] })
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
          set({ userId })
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
