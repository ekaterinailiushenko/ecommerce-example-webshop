import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { CartContext } from './context'
import { logger } from '../../utilities'
import { cartApi } from '../../api/cartApi'
import type { Cart, Product } from '../../api/types'
import { useAuthContext } from '../AuthContext/hook'

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartSummary, setCartSummary] = useState<Cart | undefined>()

  const { user } = useAuthContext()

  const handleGetCart = useCallback(async () => {
    if (!user) return

    try {
      const cart = await cartApi.getCartSummary(user.uid)
      setCartSummary(cart)
    } catch (error) {
      logger.error(`Error in CartContextProvider.handleGetCart -> ${error}`)
    }
  }, [user])

  const handleAddProductToCart = useCallback(
    async (productId: Product['product_id']) => {
      if (!user) return

      try {
        const updatedCart = await cartApi.addProductToCart({
          userId: user.uid,
          productId,
        })
        setCartSummary(updatedCart)
      } catch (error) {
        logger.error(
          `Error in CartContextProvider.handleAddProductToCart -> ${error}`,
        )
      }
    },
    [user],
  )

  const handleDeleteProductFromCart = useCallback(
    async ({
      productId,
      removeAll,
    }: {
      productId: Product['product_id']
      removeAll?: boolean
    }) => {
      if (!user) return

      try {
        const updatedCart = await cartApi.deleteProductFromCart({
          userId: user.uid,
          productId,
          removeAll,
        })
        setCartSummary(updatedCart)
      } catch (error) {
        logger.error(
          `Error in CartContextProvider.handleDeleteProductFromCart -> ${error}`,
        )
      }
    },
    [user],
  )

  const handleClearCart = useCallback(async () => {
    if (!user) return

    try {
      const updatedCart = await cartApi.clearCart(user.uid)
      setCartSummary(updatedCart)
    } catch (error) {
      logger.error(`Error in CartContextProvider.handleClearCart -> ${error}`)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      void handleGetCart()
    } else {
      setCartSummary(undefined)
    }
  }, [user, handleGetCart])

  const value = useMemo(() => {
    const obj: CartContext.Value = {
      cartSummary,
      getCart: handleGetCart,
      clearCart: handleClearCart,
      addProductToCart: handleAddProductToCart,
      deleteProductFromCart: handleDeleteProductFromCart,
    }

    return obj
  }, [
    cartSummary,
    handleGetCart,
    handleClearCart,
    handleAddProductToCart,
    handleDeleteProductFromCart,
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
