import { backendSimulator } from '../mock/backendSimulator'

/**
 * Frontend-side cart methods to work with backend's cart service
 */
export const productApi = {
  getProducts: backendSimulator.productApi.getProducts,
  getProductsDetails: backendSimulator.productApi.getProductsDetails,
  getFilteredProducts: backendSimulator.productApi.getFilteredProducts,
}
