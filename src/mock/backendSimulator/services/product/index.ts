import type { Product, ProductDetails } from '../../../../api/types'

export interface ProductsInternal {
  _products: Product[]
  get products(): Product[]
  _productDetails: ProductDetails[]
  get productDetails(): ProductDetails[]
  getFilteredProducts(searchItem: string): Product[]
}

/**
 * Internal for backend simulator (only for BE simulator internal usage) products
 */

export const productsInternal: ProductsInternal = {
  _products: [],
  get products() {
    return [...this._products]
  },
  _productDetails: [],
  get productDetails() {
    return [...this._productDetails]
  },
  getFilteredProducts(searchItem: string) {
    const filteredProducts = this._products.filter(product =>
      product.name.toLowerCase().includes(searchItem.toLowerCase()),
    )

    return [...filteredProducts]
  },
}
