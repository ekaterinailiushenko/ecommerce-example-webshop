import { productsInternal } from './index'

/**
 * Exported to the outside world methods to work with internal products
 */
export const productApi = {
  getProducts: () => {
    const products = productsInternal.products

    return Promise.resolve(products)
  },
  getFilteredProducts: (searchItem: string) => {
    const filteredProducts = productsInternal.getFilteredProducts(searchItem)

    return Promise.resolve(filteredProducts)
  },
  getProductDetails: (id: string) => {
    const productDetails = productsInternal.productDetails.find(i => i.product_id === id)

    return Promise.resolve(productDetails)
  },
}
