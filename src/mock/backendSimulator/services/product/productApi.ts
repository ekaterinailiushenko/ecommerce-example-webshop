import { productsInternal } from './index'
import { getProductsResponse } from '../../../getProductsResponse'
import { getProductDetailsResponse } from '../../../getProductDetailsResponse'

/**
 * Exported to the outside world methods to work with internal cart
 */
export const productApi = {
  getProducts: () => {
    productsInternal._products = getProductsResponse

    const products = productsInternal.getProducts()

    return Promise.resolve(products)
  },
  getFilteredProducts: (searchItem: string) => {
    productsInternal._products = getProductsResponse

    const filteredProducts = productsInternal
      .getProducts()
      .filter(product => product.name.toLowerCase().includes(searchItem.toLowerCase()))

    return Promise.resolve(filteredProducts)
  },
  getProductsDetails: (id: string) => {
    productsInternal._productDetails = getProductDetailsResponse

    const productDetails = productsInternal._productDetails.find(i => i.product_id === id)

    return Promise.resolve(productDetails)
  },
}
