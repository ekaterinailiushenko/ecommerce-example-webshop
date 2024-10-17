import Cookies from 'js-cookie'

import type { Cart, Product } from './types'
import { safeJsonParse } from '../utilities/safeJsonParse'
import { cart, type CartInternal } from '../mock/backendSimulator'
import { getProductsResponse, resetGetProductsResponse } from '../mock'

const saveCartToCookies = ({
  userId,
  cart,
}: {
  userId: string
  cart: CartInternal
}) => {
  Cookies.set(`cart-items-${userId}`, JSON.stringify(cart), { expires: 7 })
}

const loadCartFromCookies = (userId: string) => {
  const cartFromCookies = Cookies.get(`cart-items-${userId}`)

  if (!cartFromCookies) {
    return
  }

  const parsedCartFromCookies = safeJsonParse<Cart>(cartFromCookies)

  cart._productsMap = new Map(
    parsedCartFromCookies?.products.map(cookieProduct => {
      const productInDB = getProductsResponse.find(
        product => product.product_id === cookieProduct.product_id,
      )

      if (productInDB) {
        productInDB.amountInTheCart = cookieProduct.amountInTheCart
        return [productInDB.product_id, productInDB]
      }

      return [cookieProduct.product_id, cookieProduct]
    }),
  )
}

export const cartApi = {
  getCartSummary: (userId: string) => {
    loadCartFromCookies(userId)
    return Promise.resolve(cart)
  },
  addProductToCart: ({
    userId,
    productId,
  }: {
    userId: string
    productId: Product['product_id']
  }) => {
    const productInDB = getProductsResponse.find(
      product => product.product_id === productId,
    )!

    const productInProductsSet = cart._productsMap.get(productId)

    if (productInProductsSet) {
      productInProductsSet.amountInTheCart++
    } else {
      cart._productsMap.set(productInDB.product_id, {
        ...productInDB,
        amountInTheCart: 1,
      })
    }

    productInDB.amountInTheCart =
      cart._productsMap.get(productId)?.amountInTheCart || 1

    saveCartToCookies({ userId, cart })

    return Promise.resolve(cart)
  },
  deleteProductFromCart: ({
    userId,
    productId,
    removeAll = false,
  }: {
    userId: string
    productId: Product['product_id']
    removeAll?: boolean
  }) => {
    const productInDB = getProductsResponse.find(
      product => product.product_id === productId,
    )!

    const productInProductsSet = cart._productsMap.get(productId)

    if (
      removeAll ||
      (productInProductsSet && productInDB.amountInTheCart === 1)
    ) {
      productInDB.amountInTheCart = 0
      cart._productsMap.delete(productId)
    } else if (productInProductsSet && productInDB.amountInTheCart > 1) {
      productInProductsSet.amountInTheCart--
      productInDB.amountInTheCart = productInProductsSet.amountInTheCart
    }

    saveCartToCookies({ userId, cart })

    return Promise.resolve(cart)
  },
  clearCart: (userId: string) => {
    cart._productsMap.clear()
    resetGetProductsResponse()

    Cookies.remove(`cart-items-${userId}`)

    return Promise.resolve(cart)
  },
}
