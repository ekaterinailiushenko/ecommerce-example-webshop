import { useTranslation } from 'react-i18next'

import { ProductCard } from './components'
import productNotFoundLogo from '../../../../assets/productNotFoundLogo.png'
import { useProductContext } from '../../../../contexts/ProductContext/hook'

export const Products = () => {
  const { t } = useTranslation()

  const { products } = useProductContext()

  const renderProducts = () => {
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
      <div className="grid grid-cols-2 lg:grid-cols-6 sm:grid-cols-3 gap-2 px-8 py-9">
        {products.map(product => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    )
  }

  return renderProducts()
}
