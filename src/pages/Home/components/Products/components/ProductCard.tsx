import { useTranslation } from 'react-i18next'

import { ProductCardModal } from './ProductCardModal'
import type { Product } from '../../../../../api/types'
import { useFormattedProductDetails } from '../../../../../hooks'
import { Badge, Button, Container, Text } from '../../../../../uikit'
import { ProductQuantityInCartButton } from '../../../../Cart/components'
import { useModalContext } from '../../../../../contexts/ModalContext/hook'

export const ProductCard = ({ product }: { product: Product }) => {
  const { t } = useTranslation()

  const { openModal } = useModalContext()

  const { isNewProduct, priceText, stockText } = useFormattedProductDetails({
    weight: product.weight,
    stock: product.stock,
    rating: product.rating,
    pricePerProduct: product.pricePerProduct,
  })

  const handleOpenModalClick = () => {
    openModal({
      content: <ProductCardModal product={product} />,
    })
  }

  return (
    <Container className="group/item bg-white shadow-md rounded-xl overflow-hidden flex flex-col">
      <Container className="relative flex items-center justify-center bg-grey1">
        <img
          src={product.image}
          alt={t('products.productImageAltText')}
          className="size-24 md:size-36 object-contain transition-all group-hover/item:scale-110 duration-700 my-2"
        />
        <Button
          variant="info"
          size="small"
          className="absolute invisible sm:invisible sm:group-hover/item:visible"
          label={t('products.quickView')}
          onClick={handleOpenModalClick}
        />
        <Badge
          variant="rating"
          label={isNewProduct ? t('products.newProduct.badge') : product.rating.toString()}
          textSize="s"
          className="absolute -bottom-0.5 left-4"
        />
      </Container>
      <Container className="mx-4 h-full flex flex-col justify-between gap-4">
        <Container className="h-full flex flex-col space-y-2.5 py-2">
          <Text text={product.name} className="leading-none" />
          {product.weight && (
            <Text
              text={t('products.weightPerPiece', { weight: product.weight })}
              size="s"
              className="text-grey3"
            />
          )}
          <Container className="">
            {isNewProduct ? (
              <>
                <Badge variant="priceTagNewProduct" label={priceText} />
                <Text text={t('products.newProduct.label')} size="xs" className="text-blue1" />
              </>
            ) : (
              <Badge variant="priceTagProduct" label={priceText} />
            )}
          </Container>
        </Container>
        <Container>
          <ProductQuantityInCartButton product={product} />
          <Text text={stockText} size="xs" className="text-green1 my-2 justify-self-center" />
        </Container>
      </Container>
    </Container>
  )
}
