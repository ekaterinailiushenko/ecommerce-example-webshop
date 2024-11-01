import type { Product, ProductDetails } from '../../../../api/types'

export interface ProductsInternal {
  _products: Product[]
  _productDetails: ProductDetails[]
  getProducts(): Product[]
  getProductDetails(): ProductDetails[]
}

/**
 * Internal for backend simulator (only for BE simulator internal usage) live (loaded from persistance) cart instance
 */

export const productsInternal: ProductsInternal = {
  _products: [],
  _productDetails: [],
  getProducts() {
    return [...this._products]
  },
  getProductDetails() {
    return [...this._productDetails]
  },
}
