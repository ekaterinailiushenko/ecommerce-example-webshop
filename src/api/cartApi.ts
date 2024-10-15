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
const saveCartToCookies = (cart: CartInternal) => {
  Cookies.set('cart-items', JSON.stringify(cart), { expires: 7 })
}

// Helper function to load the cart from cookies
const loadCartFromCookies = () => {
  const cartData = Cookies.get('cart-items')
  if (cartData) {
    try {
      const parsedCart = JSON.parse(cartData) as Cart
      cart._productsSet = new Map(
        parsedCart.products.map(cookieProduct => {
          const productInResponse = getProductsResponse.find(
            product => product.product_id === cookieProduct.product_id
          )

          if (productInResponse) {
            productInResponse.amountInTheCart = cookieProduct.amountInTheCart
            return [productInResponse.product_id, productInResponse]
          }

          return [cookieProduct.product_id, cookieProduct]
        })
      )
    } catch (error) {
      logger.error(`Error parsing cart data from cookies: ${error}`)
    }
  }
}

loadCartFromCookies()

export const cartApi = {
  getCartSummary: () => Promise.resolve(cart),
  addProductToCart: (productId: Product['product_id']) => {
    const product = getProductsResponse.find(
      product => product.product_id === productId
    )!

    product.amountInTheCart++

    const productInProductsSet = cart._productsSet.get(productId)

    if (productInProductsSet) {
      productInProductsSet.amountInTheCart++
    } else {
      cart._productsSet.set(product.product_id, { ...product })
    }

    saveCartToCookies(cart)
    return Promise.resolve(cart)
  },
  deleteProductFromCart: (
    productId: Product['product_id'],
    removeAll: boolean = false
  ) => {
    const product = getProductsResponse.find(
      product => product.product_id === productId
    )!

    const productInProductsSet = cart._productsSet.get(productId)

    if (removeAll || (productInProductsSet && product.amountInTheCart === 1)) {
      product.amountInTheCart = 0
      cart._productsSet.delete(productId)
    } else if (productInProductsSet && product.amountInTheCart > 1) {
      productInProductsSet.amountInTheCart--
      product.amountInTheCart = productInProductsSet.amountInTheCart
    }

    saveCartToCookies(cart)
    return Promise.resolve(cart)
  },
  clearCart: () => {
    cart._productsSet.clear()
    resetGetProductsResponse()

    Cookies.remove('cart-items')
    return Promise.resolve(cart)
  },
}
