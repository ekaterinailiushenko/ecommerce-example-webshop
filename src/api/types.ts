export interface Product {
  product_id: string
  name: string
  price: number
  image: string
  amountInTheCart: number
}

export interface ProductDetails {
  product_id: string
  name: string
  price: number
  image: string
  description?: string
}

export interface Cart {
  products: Product[]
  /**
   * Total price of all products in cart without delivery costs
   */
  totalPrice: number
  deliveryCosts: number
  productsQuantity: number
  totalPriceWithDeliveryCosts: number
}
