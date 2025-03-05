import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import type { Product } from '../../../../../api/types'
import { useFormattedProductDetails } from '../../../../../hooks'
import { ProductQuantityInCartButton } from '../../../../Cart/components'
import { useModalContext } from '../../../../../contexts/ModalContext/hook'
import { useProductContext } from '../../../../../contexts/ProductContext/hook'
import { Badge, Button, Container, Icon, ImageWithPlaceholder, Text } from '../../../../../uikit'

const MODAL_PRODUCT_IMAGE_SIZE = 140

export const ProductCardModal = ({ product }: { product: Product }) => {
  const { t } = useTranslation()

  const { closeModal } = useModalContext()

  const { isNewProduct, priceText, stockText } = useFormattedProductDetails({
    weight: product.weight,
    stock: product.stock,
    rating: product.rating,
    pricePerProduct: product.pricePerProduct,
  })

  const { getProductDetails, productDetails, isProductDetailsError, isProductDetailsLoading } =
    useProductContext()

  useEffect(() => {
    void getProductDetails(product.product_id)
  }, [getProductDetails, product.product_id])

  if (isProductDetailsError) {
    return (
      <Container className="flex flex-col items-center p-5 gap-5">
        <Text text={t('products.modal.error')} size="xl" className="text-center" />
        <Button
          variant="danger"
          size="large"
          label={t('global.closeButton')}
          onClick={closeModal}
        />
      </Container>
    )
  }

  if (isProductDetailsLoading || !productDetails) {
    return (
      <Container className="flex flex-col items-center justify-center h-full p-5 gap-5">
        <Icon variant="spinner" size="lg" />
        <Text text={t('global.loading')} />
      </Container>
    )
  }

  return (
    <Container className="grid grid-rows-2 grid-cols-1 gap-4 md:max-h-[500px]">
      <Container className="grid grid-cols-2 gap-4">
        <Container className="grid grid-rows-3">
          <Container className="relative row-span-2 bg-grey1 rounded-lg overflow-hidden">
            <ImageWithPlaceholder
              size={MODAL_PRODUCT_IMAGE_SIZE}
              key={productDetails.image}
              src={productDetails.image}
              alt={t('products.modal.productImageAltText')}
            />
            <Badge
              variant="rating"
              label={isNewProduct ? t('products.newProduct.badge') : product.rating.toString()}
              textSize="s"
              className="absolute -bottom-0.5 left-4 font-semibold"
            />
          </Container>
        </Container>
        <Container className="grid grid-rows-3">
          <Container className="row-span-3 flex flex-col gap-5">
            <Text text={productDetails.name} size="xl" className="font-bold leading-none" />
            <Container className="flex gap-1">
              {product.weight && (
                <>
                  <Text
                    text={t('products.weightPerPiece', { weight: product.weight })}
                    size="s"
                    className="text-grey3 leading-none"
                  />
                  <Text
                    text={t('global.dividerSymbol')}
                    className="font-semibold text-grey3 leading-none"
                  />
                </>
              )}
              <Text text={stockText} size="s" className="text-green1 leading-none" />
            </Container>
            <Container>
              {isNewProduct ? (
                <>
                  <Badge
                    variant="priceTagNewProduct"
                    label={priceText}
                    textSize="xxl"
                    className="font-semibold"
                  />
                  <Text text={t('products.newProduct.label')} size="xs" className="text-blue1" />
                </>
              ) : (
                <Badge
                  variant="priceTagProduct"
                  label={priceText}
                  textSize="xxl"
                  className="font-semibold"
                />
              )}
            </Container>
            <ProductQuantityInCartButton product={product} />
          </Container>
        </Container>
      </Container>
      <div className="col-span-2 overflow-y-auto max-h-64">
        <p className="font-semibold text-gray-500 text-base">{t('products.modal.description')}</p>
        <p className="text-sm mb-3">{productDetails.description}</p>
        <p className="font-semibold text-gray-500 text-base">
          {t('products.modal.storageInstructions.title')}
        </p>
        <p className="text-sm mb-3">
          {t('products.modal.storageInstructions.part1')}
          <span className="lowercase">{productDetails.name}</span>
          {t('products.modal.storageInstructions.part2')}
        </p>
        <p className="font-semibold text-gray-500 text-base">
          {t('products.modal.usageSuggestions.title')}
        </p>
        <ul className="list-disc list-inside text-sm mb-3">
          <li>{t('products.modal.usageSuggestions.bullet1')}</li>
          <li>{t('products.modal.usageSuggestions.bullet2')}</li>
          <li>{t('products.modal.usageSuggestions.bullet3')}</li>
        </ul>
        <p className="font-semibold text-gray-500 text-base">
          {t('products.modal.features.title')}
        </p>
        <ul className="list-disc list-inside text-sm mb-3">
          <li>{t('products.modal.features.bullet1')}</li>
          <li>{t('products.modal.features.bullet2')}</li>
          <li>{t('products.modal.features.bullet3')}</li>
          <li>{t('products.modal.features.bullet4')}</li>
        </ul>
      </div>
    </Container>
  )
}
