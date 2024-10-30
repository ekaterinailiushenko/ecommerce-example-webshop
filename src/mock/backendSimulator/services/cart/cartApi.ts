import Cookies from 'js-cookie'

import {
  getProductsResponse,
  resetGetProductsResponse,
} from '../../../getProductsResponse'
import { cartInternal } from './index'
import { cartPersistor } from './persistor'
import { STATIC_GUEST_USER_ID } from './constants'
import type { Product } from '../../../../api/types'

/**
 * Exported to the outside world methods to work with internal cart
 */
export const cartApi = {
  getCartSummary: (userId: string = STATIC_GUEST_USER_ID) => {
    cartPersistor.load(userId)

    return Promise.resolve({ ...cartInternal })
  },
  addProductToCart: ({
    userId = STATIC_GUEST_USER_ID,
    productId,
  }: {
    userId?: string
    productId: Product['product_id']
  }) => {
    const productInDB = getProductsResponse.find(
      product => product.product_id === productId,
    )!

    const productInProductsMap = cartInternal._productsMap.get(productId)

    if (productInProductsMap) {
      productInProductsMap.amountInCart++
      productInProductsMap.priceForAmountInCart += productInDB.pricePerProduct
    } else {
      cartInternal._productsMap.set(productInDB.product_id, {
        ...productInDB,
        amountInCart: 1,
        priceForAmountInCart: productInDB.pricePerProduct,
      })
    }

    productInDB.amountInCart =
      cartInternal._productsMap.get(productId)?.amountInCart || 1

    cartPersistor.save({ userId, cartInternal })

    return Promise.resolve({ ...cartInternal })
  },
  deleteProductFromCart: ({
    userId = STATIC_GUEST_USER_ID,
    productId,
    removeAll = false,
  }: {
    userId?: string
    productId: Product['product_id']
    removeAll?: boolean
  }) => {
    const productInDB = getProductsResponse.find(
      product => product.product_id === productId,
    )!

    const productInProductsMap = cartInternal._productsMap.get(productId)

    if (removeAll || (productInProductsMap && productInDB.amountInCart === 1)) {
      productInDB.amountInCart = 0
      productInDB.priceForAmountInCart = 0

      cartInternal._productsMap.delete(productId)
    } else if (productInProductsMap && productInDB.amountInCart > 1) {
      productInProductsMap.amountInCart--
      productInProductsMap.priceForAmountInCart -= productInDB.pricePerProduct

      productInDB.amountInCart = productInProductsMap.amountInCart
      productInDB.priceForAmountInCart =
        productInProductsMap.priceForAmountInCart
    }

    cartPersistor.save({ userId, cartInternal })

    return Promise.resolve({ ...cartInternal })
  },
  clearCart: (userId: string = STATIC_GUEST_USER_ID) => {
    cartInternal._productsMap.clear()
    resetGetProductsResponse()

    Cookies.remove(`cart-items-${userId}`)

    cartPersistor.save({ userId, cartInternal })

    return Promise.resolve({ ...cartInternal })
  },
}
