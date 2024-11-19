import { cartApi } from './services/cart/cartApi'
import { productApi } from './services/product/productApi'

/**
 * Exported for backend clients (frontend etc) methods to work with backend services
 */
export const backendSimulator = {
  cartApi,
  productApi,
}
