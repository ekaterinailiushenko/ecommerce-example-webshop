import { backendSimulator } from '../mocks/backendSimulator'

/**
 * Frontend-side cart methods to work with backend's cart service
 */
export const cartApi = {
  clearCart: backendSimulator.cartApi.clearCart,
  getCartSummary: backendSimulator.cartApi.getCartSummary,
  addProductToCart: backendSimulator.cartApi.addProductToCart,
  deleteProductFromCart: backendSimulator.cartApi.deleteProductFromCart,
}
