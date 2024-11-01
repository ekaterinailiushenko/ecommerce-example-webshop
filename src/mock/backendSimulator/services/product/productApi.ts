import { productsInternal } from './index'
import { getProductsResponse } from '../../../getProductsResponse'
import { getProductDetailsResponse } from '../../../getProductDetailsResponse'

/**
 * Exported to the outside world methods to work with internal products
 */
export const productApi = {
  getProducts: () => {
    productsInternal._products = getProductsResponse

    const products = productsInternal.products

    return Promise.resolve(products)
  },
  getFilteredProducts: (searchItem: string) => {
    const filteredProducts = productsInternal.getFilteredProducts(searchItem)

    return Promise.resolve(filteredProducts)
  },
  getProductDetails: (id: string) => {
    productsInternal._productDetails = getProductDetailsResponse

    const productDetails = productsInternal._productDetails.find(i => i.product_id === id)

    return Promise.resolve(productDetails)
  },
}
