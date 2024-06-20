import axios from 'axios'

export const API_URL =
  'https://s3-eu-west-1.amazonaws.com/developer-application-test/cart'

export const getProducts = () => axios.get(`${API_URL}/list`)

export const getProductDetails = (id: string) =>
  axios.get(`${API_URL}/${id}/detail`)
