import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Products } from './components'
import { useProductContext } from '../../contexts/ProductContext/hook'

export const Home = () => {
  const { t } = useTranslation()

  const { isLoading, isProductsError, getProducts } = useProductContext()

  useEffect(() => {
    void getProducts()
  }, [getProducts])

  if (isLoading) {
    return <p>{t('global.loading')}</p>
  }

  if (isProductsError) {
    return <p>{t('products.errors.loadError')}</p>
  }

  return (
    <div className="flex flex-1 flex-col sm:mx-20 md:mx-40">
      <Products />
    </div>
  )
}
