import { useTranslation } from 'react-i18next'

import type { Product } from '../api/types'
import { formatPrice, formatWeight } from '../utilities'

export const useFormattedProductDetails = ({
  weight,
  stock,
  rating,
  pricePerProduct,
}: Pick<Product, 'weight' | 'stock' | 'rating' | 'pricePerProduct'>) => {
  const { t } = useTranslation()

  const isNewProduct = rating === 0

  const isProductByPiece = weight !== undefined

  const priceText = isProductByPiece
    ? formatPrice(pricePerProduct)
    : t('products.pricePerKg', { price: formatPrice(pricePerProduct) })

  const stockText = isProductByPiece
    ? t('products.amountInStockPer.piece', { stock: stock })
    : t('products.amountInStockPer.kg', { stock: formatWeight(stock) })

  return { isNewProduct, priceText, stockText }
}
