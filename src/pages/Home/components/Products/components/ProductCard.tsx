import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { Button } from '../../../../../uikit'
import { ProductCardModal } from './ProductCardModal'
import { formatPrice } from '../../../../../utilities'
import type { Product } from '../../../../../api/types'
import { ProductQuantityInCartButton } from '../../../../Cart/components'
import { useModalContext } from '../../../../../contexts/ModalContext/hook'

export const ProductCard = ({ product }: { product: Product }) => {
  const { t } = useTranslation()

  const { openModal } = useModalContext()

  const handleOpenModalClick = () => {
    openModal({
      content: <ProductCardModal product={product} />,
    })
  }

  return (
    <div className="group/item min-h-68 bg-white shadow-md rounded flex flex-col p-5">
      <h5 className="font-semibold text-lg self-start">{product.name}</h5>
      <div
        className={classNames(
          'relative w-3/5 h-3/5 flex items-center justify-center self-center',
          'transition-all group-hover/item:scale-110 duration-700'
        )}
      >
        <img
          src={product.image}
          alt={t('products.productImageAltText')}
          className="object-contain"
        />
        <Button
          variant="info"
          size="small"
          className="absolute invisible group-hover/item:visible"
          label={t('products.quickView')}
          onClick={handleOpenModalClick}
        />
      </div>
      <h5 className="self-end mb-4 font-semibold">{formatPrice(product.pricePerProduct)}</h5>
      <ProductQuantityInCartButton product={product} />
    </div>
  )
}
