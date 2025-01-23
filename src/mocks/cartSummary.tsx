import type { Cart as CartType } from '../api/types'
import { getProductsResponse } from './getProductsResponse'

export const mockCartSummary: CartType = {
  products: getProductsResponse,
  totalPrice: 3505,
  deliveryCosts: 500,
  productsQuantity: 2,
  totalPriceWithDeliveryCosts: 4005,
}

export const mockEmptyCartSummary: CartType = {
  products: [],
  totalPrice: 0,
  deliveryCosts: 0,
  productsQuantity: 0,
  totalPriceWithDeliveryCosts: 0,
}
