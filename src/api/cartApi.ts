import Cookies from 'js-cookie'

import { logger } from '../utilities'
import type { Cart, Product } from './types'
import { getProductsResponse, resetGetProductsResponse } from '../mock'

interface CartInternal extends Cart {
  _productsSet: Map<Product['product_id'], Product>
}
const cart: CartInternal = {
  _productsSet: new Map(),
  get products() {
    return [...this._productsSet.values()]
  },
  get totalPrice() {
    return this.products.reduce(
      (currentPrice, product) =>
        currentPrice + product.price * product.amountInTheCart,
      0
    )
  },
  get deliveryCosts() {
    if (this.totalPrice < 10000) {
      return 555
    }

    return 0
  },
  get productsQuantity() {
    return this.products.reduce(
      (totalAmountInTheCart, product) =>
        totalAmountInTheCart + product.amountInTheCart,
      0
    )
  },
  get totalPriceWithDeliveryCosts() {
    return this.totalPrice + this.deliveryCosts
  },
}
const saveCartToCookies = (userId: string, cart: CartInternal) => {
  Cookies.set(`cart-items-${userId}`, JSON.stringify(cart), { expires: 7 })
}

const loadCartFromCookies = (userId: string) => {
  const cartFromCookies = Cookies.get(`cart-items-${userId}`)
  if (cartFromCookies) {
    try {
      const parsedCartFromCookies = JSON.parse(cartFromCookies) as Cart
      cart._productsSet = new Map(
        parsedCartFromCookies.products.map(cookieProduct => {
          const productInDB = getProductsResponse.find(
            product => product.product_id === cookieProduct.product_id
          )

          if (productInDB) {
            productInDB.amountInTheCart = cookieProduct.amountInTheCart
            return [productInDB.product_id, productInDB]
          }

          return [cookieProduct.product_id, cookieProduct]
        })
      )
    } catch (error) {
      logger.error(`Error parsing cart data from cookies: ${error}`)
    }
  }
}

export const cartApi = {
  getCartSummary: (userId: string) => {
    loadCartFromCookies(userId)
    return Promise.resolve(cart)
  },
  addProductToCart: (userId: string, productId: Product['product_id']) => {
    const productInDB = getProductsResponse.find(
      product => product.product_id === productId
    )!

    const productInProductsSet = cart._productsSet.get(productId)

    if (productInProductsSet) {
      productInProductsSet.amountInTheCart++
    } else {
      cart._productsSet.set(productInDB.product_id, {
        ...productInDB,
        amountInTheCart: 1,
      })
    }

    productInDB.amountInTheCart =
      cart._productsSet.get(productId)?.amountInTheCart || 1

    saveCartToCookies(userId, cart)

    return Promise.resolve(cart)
  },
  deleteProductFromCart: (
    userId: string,
    productId: Product['product_id'],
    removeAll: boolean = false
  ) => {
    const productInDB = getProductsResponse.find(
      product => product.product_id === productId
    )!

    const productInProductsSet = cart._productsSet.get(productId)

    if (
      removeAll ||
      (productInProductsSet && productInDB.amountInTheCart === 1)
    ) {
      productInDB.amountInTheCart = 0
      cart._productsSet.delete(productId)
    } else if (productInProductsSet && productInDB.amountInTheCart > 1) {
      productInProductsSet.amountInTheCart--
      productInDB.amountInTheCart = productInProductsSet.amountInTheCart
    }

    saveCartToCookies(userId, cart)

    return Promise.resolve(cart)
  },
  clearCart: (userId: string) => {
    cart._productsSet.clear()
    resetGetProductsResponse()

    Cookies.remove(`cart-items-${userId}`)

    return Promise.resolve(cart)
  },
}
