import { getProductsResponse, getProductDetailsResponse } from '../mock'

export const API_URL = 'https://s3-eu-west-1.amazonaws.com/developer-application-test/cart'

export const getProducts = () => Promise.resolve(getProductsResponse)

export const getProductDetails = (id: string) =>
  Promise.resolve(getProductDetailsResponse.find(i => i.product_id === id))
