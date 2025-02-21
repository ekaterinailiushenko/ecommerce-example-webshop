import { useTranslation } from 'react-i18next'

import { ProductCard } from './components'
import productNotFoundLogo from '../../../../assets/productNotFoundLogo.png'
import { useProductContext } from '../../../../contexts/ProductContext/hook'

export const Products = () => {
  const { t } = useTranslation()

  const { products } = useProductContext()

  if (!products.length) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <img
          className="size-16"
          src={productNotFoundLogo}
          alt={t('products.errors.notFound.altText')}
        />
        <p>{t('products.errors.notFound.title')}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 p-4 gap-4 lg:grid-cols-4 sm:grid-cols-3 sm:gap-7 sm:py-10">
      {products.map(product => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  )
}
