import type { Cart as CartType } from '../api/types'

export const mockProducts: CartType['products'] = [
  {
    product_id: '1',
    name: 'Apples',
    pricePerProduct: 120,
    image: 'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/1.jpg',
    amountInCart: 1,
    priceForAmountInCart: 0,
  },
  {
    product_id: '2',
    name: 'Oranges',
    pricePerProduct: 167,
    image: 'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/2.jpg',
    amountInCart: 1,
    priceForAmountInCart: 0,
  },
]

export const mockCartSummary: CartType = {
  products: mockProducts,
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
