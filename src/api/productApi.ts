import { backendSimulator } from '../mock/backendSimulator'

/**
 * Frontend-side product methods to work with backend's product service
 */
export const productApi = {
  getProducts: backendSimulator.productApi.getProducts,
  getProductDetails: backendSimulator.productApi.getProductDetails,
  getFilteredProducts: backendSimulator.productApi.getFilteredProducts,
}
