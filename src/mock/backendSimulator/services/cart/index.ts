import type { Cart, Product } from '../../../../api/types'

export interface CartInternal extends Cart {
  _productsMap: Map<Product['product_id'], Product>
}

const DELIVERY_COSTS = 555
const ORDER_AMOUNT_FOR_FREE_DELIVERY = 10000

/**
 * Internal for backend simulator (only for BE simulator internal usage) live (loaded from persistance) cart instance
 */
export const cartInternal: CartInternal = {
  _productsMap: new Map(),
  get products() {
    return [...this._productsMap.values()]
  },
  get totalPrice() {
    return this.products.reduce(
      (currentPrice, product) => currentPrice + product.pricePerProduct * product.amountInCart,
      0
    )
  },
  get deliveryCosts() {
    if (this.totalPrice < ORDER_AMOUNT_FOR_FREE_DELIVERY) {
      return DELIVERY_COSTS
    }

    return 0
  },
  get productsQuantity() {
    return this.products.reduce(
      (totalAmountInTheCart, product) => totalAmountInTheCart + product.amountInCart,
      0
    )
  },
  get totalPriceWithDeliveryCosts() {
    return this.totalPrice + this.deliveryCosts
  },
}
