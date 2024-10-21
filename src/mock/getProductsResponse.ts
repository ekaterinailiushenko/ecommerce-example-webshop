import lodash from 'lodash'

import type { Product } from '../api/types'

const getProductsResponseInitial: Product[] = [
  {
    product_id: '1',
    name: 'Apples',
    pricePerProduct: 120,
    image:
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/1.jpg',
    amountInCart: 0,
    priceForAmountInCart: 0,
  },
  {
    product_id: '2',
    name: 'Oranges',
    pricePerProduct: 167,
    image:
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/2.jpg',
    amountInCart: 0,
    priceForAmountInCart: 0,
  },
  {
    product_id: '3',
    name: 'Bananas',
    pricePerProduct: 88,
    image:
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/3.jpg',
    amountInCart: 0,
    priceForAmountInCart: 0,
  },
  {
    product_id: '4',
    name: 'Onions',
    pricePerProduct: 110,
    image:
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/4.jpg',
    amountInCart: 0,
    priceForAmountInCart: 0,
  },
  {
    product_id: '5',
    name: 'Steak',
    pricePerProduct: 543,
    image:
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/5.jpg',
    amountInCart: 0,
    priceForAmountInCart: 0,
  },
  {
    product_id: '6_id_is_a_string',
    name: 'Pork',
    pricePerProduct: 343,
    image:
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/6.jpg',
    amountInCart: 0,
    priceForAmountInCart: 0,
  },
  {
    product_id: '7',
    name: 'Chicken',
    pricePerProduct: 272,
    image:
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/chicken.jpg',
    amountInCart: 0,
    priceForAmountInCart: 0,
  },
  {
    product_id: '8',
    name: 'Salmon',
    pricePerProduct: 267,
    image:
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/8.jpg',
    amountInCart: 0,
    priceForAmountInCart: 0,
  },
  {
    product_id: '9',
    name: 'Tuna',
    pricePerProduct: 557,
    image:
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/9.jpg',
    amountInCart: 0,
    priceForAmountInCart: 0,
  },
  {
    product_id: '10',
    name: 'Broccoli',
    pricePerProduct: 32,
    image:
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/10.jpg',
    amountInCart: 0,
    priceForAmountInCart: 0,
  },
  {
    product_id: '11',
    name: 'Bacon',
    pricePerProduct: 212,
    image:
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/11.jpg',
    amountInCart: 0,
    priceForAmountInCart: 0,
  },
  {
    product_id: '12',
    name: 'Peppers',
    pricePerProduct: 9,
    image:
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/12.jpg',
    amountInCart: 0,
    priceForAmountInCart: 0,
  },
]

export let getProductsResponse: Product[] = lodash.cloneDeep(
  getProductsResponseInitial,
)

export const resetGetProductsResponse = () => {
  getProductsResponse = lodash.cloneDeep(getProductsResponseInitial)
}
