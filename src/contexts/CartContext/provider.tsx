import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

import { CartContext } from './context'
import { logger } from '../../utilities'
import { cartApi } from '../../api/cartApi'
import type { Cart, Product } from '../../api/types'
import { useAuthContext } from '../AuthContext/hook'
import { Events, PubSub } from '../../utilities/pubSub'

const initialCartSummary: Cart = {
  products: [],
  totalPrice: 0,
  deliveryCosts: 0,
  productsQuantity: 0,
  totalPriceWithDeliveryCosts: 0,
}

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [cartSummary, setCartSummary] = useState<Cart>(initialCartSummary)

  const { user } = useAuthContext()

  const handleGetCart = useCallback(async () => {
    setIsLoading(true)

    try {
      const cart = await cartApi.getCartSummary(user?.uid)
      setCartSummary(cart)
    } catch (error) {
      logger.error(`Error in CartContextProvider.handleGetCart -> ${error}`)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  const handleAddProductToCart = useCallback(
    async (productId: Product['product_id']) => {
      setIsLoading(true)

      try {
        const updatedCart = await cartApi.addProductToCart({
          userId: user?.uid,
          productId,
        })
        setCartSummary(updatedCart)
      } catch (error) {
        logger.error(`Error in CartContextProvider.handleAddProductToCart -> ${error}`)
      } finally {
        setIsLoading(false)
      }
    },
    [user]
  )

  const handleDeleteProductFromCart = useCallback(
    async ({ productId, removeAll }: { productId: Product['product_id']; removeAll?: boolean }) => {
      setIsLoading(true)

      try {
        const updatedCart = await cartApi.deleteProductFromCart({
          userId: user?.uid,
          productId,
          removeAll,
        })
        setCartSummary(updatedCart)
      } catch (error) {
        logger.error(`Error in CartContextProvider.handleDeleteProductFromCart -> ${error}`)
      } finally {
        setIsLoading(false)
      }
    },
    [user]
  )

  const handleClearCart = useCallback(async () => {
    setIsLoading(true)

    try {
      const updatedCart = await cartApi.clearCart(user?.uid)
      setCartSummary(updatedCart)
    } catch (error) {
      logger.error(`Error in CartContextProvider.handleClearCart -> ${error}`)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    void handleGetCart()
  }, [handleGetCart])

  useEffect(() => {
    const unsubscribe = PubSub.subscribe(Events.USER_LOGGED_IN, () => {
      void handleClearCart()
    })

    return unsubscribe
  }, [handleClearCart])

  const value = useMemo(() => {
    const obj: CartContext.Value = {
      cartSummary,
      loading: isLoading,
      getCart: handleGetCart,
      clearCart: handleClearCart,
      addProductToCart: handleAddProductToCart,
      deleteProductFromCart: handleDeleteProductFromCart,
    }

    return obj
  }, [
    isLoading,
    cartSummary,
    handleGetCart,
    handleClearCart,
    handleAddProductToCart,
    handleDeleteProductFromCart,
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
