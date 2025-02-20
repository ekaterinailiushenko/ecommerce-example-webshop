import { useTranslation } from 'react-i18next'

import type { Product } from '../api/types'
import { formatPrice, formatWeight } from '../utilities'

export const useFormattedProductDetails = (
  product: Pick<Product, 'weight' | 'stock' | 'rating' | 'pricePerProduct'>
) => {
  const { t } = useTranslation()

  const isNewProduct = product.rating === 0

  const isProductByPiece = product.weight !== undefined

  const priceText = isProductByPiece
    ? formatPrice(product.pricePerProduct)
    : t('products.pricePerKg', { price: formatPrice(product.pricePerProduct) })

  const stockText = isProductByPiece
    ? t('products.amountInStockPer.piece', { stock: product.stock })
    : t('products.amountInStockPer.kg', { stock: formatWeight(product.stock) })

  return { isNewProduct, priceText, stockText }
}
