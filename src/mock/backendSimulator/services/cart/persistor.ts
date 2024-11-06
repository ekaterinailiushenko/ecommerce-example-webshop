import Cookies from 'js-cookie'

import type { Cart } from '../../../../api/types'
import { safeJsonParse } from '../../../../utilities'
import { cartInternal, type CartInternal } from './index'
import { getProductsResponse } from '../../../getProductsResponse'

const COOKIE_EXPIRATION_DAYS = 7

const saveCartToCookies = ({
  userId,
  cartInternal,
}: {
  userId: string
  cartInternal: CartInternal
}) => {
  Cookies.set(`cart-items-${userId}`, JSON.stringify(cartInternal), {
    expires: COOKIE_EXPIRATION_DAYS,
  })
}

const loadCartFromCookies = (userId: string) => {
  const cartFromCookies = Cookies.get(`cart-items-${userId}`)

  if (!cartFromCookies) {
    return
  }

  const parsedCartFromCookies = safeJsonParse<Cart>(cartFromCookies)

  if (!parsedCartFromCookies) {
    Cookies.remove(`cart-items-${userId}`)
    return
  }

  cartInternal._productsMap = new Map(
    parsedCartFromCookies.products.map(cookieProduct => {
      const productInDB = getProductsResponse.find(
        product => product.product_id === cookieProduct.product_id
      )

      if (productInDB) {
        productInDB.amountInCart = cookieProduct.amountInCart
        productInDB.priceForAmountInCart = cookieProduct.priceForAmountInCart
        return [productInDB.product_id, productInDB]
      }

      return [cookieProduct.product_id, cookieProduct]
    })
  )
}

export const cartPersistor = {
  save: saveCartToCookies,
  load: loadCartFromCookies,
}
