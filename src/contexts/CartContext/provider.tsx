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

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartSummary, setCartSummary] = useState<Cart | undefined>()

  const handleGetCart = useCallback(async () => {
    try {
      const cart = await cartApi.getCartSummary()
      setCartSummary(cart)
    } catch (exception) {
      logger.error(`Error in CartContextProvider.handleGetCart -> ${exception}`)
    }
  }, [])

  const handleAddProductToCart = useCallback(
    async (productId: Product['product_id']) => {
      try {
        const updatedCart = await cartApi.addProductToCart(productId)
        setCartSummary({ ...updatedCart })
      } catch (exception) {
        logger.error(
          `Error in CartContextProvider.handleAddProductToCart -> ${exception}`
        )
      }
    },
    []
  )

  const handleDeleteProductFromCart = useCallback(
    async (productId: Product['product_id'], removeAll?: boolean) => {
      try {
        const updatedCart = await cartApi.deleteProductFromCart(
          productId,
          removeAll
        )
        setCartSummary({ ...updatedCart })
      } catch (exception) {
        logger.error(
          `Error in CartContextProvider.handleDeleteProductFromCart -> ${exception}`
        )
      }
    },
    []
  )

  const handleClearCart = useCallback(async () => {
    try {
      const updatedCart = await cartApi.clearCart()
      setCartSummary({ ...updatedCart })
    } catch (exception) {
      logger.error(
        `Error in CartContextProvider.handleClearCart -> ${exception}`
      )
    }
  }, [])

  useEffect(() => {
    void handleGetCart()
  }, [handleGetCart])

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
