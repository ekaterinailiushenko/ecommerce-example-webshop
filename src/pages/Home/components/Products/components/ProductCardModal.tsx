import { useEffect } from 'react'

import en from '../../../../../i18n/en.json'
import { formatPrice } from '../../../../../utilities'
import type { Product } from '../../../../../api/types'
import { Icon, CartButton } from '../../../../../uikit'
import { useModalContext } from '../../../../../contexts/ModalContext/hook'
import { useProductContext } from '../../../../../contexts/ProductContext/hook'
import { ImageWithPlaceholder } from '../../../../../uikit/ImageWithPlaceholder'

export const ProductCardModal = ({ product }: { product: Product }) => {
  const { closeModal } = useModalContext()

  const { getProductDetails, productDetails, isProductDetailsError, isProductDetailsLoading } =
    useProductContext()

  useEffect(() => {
    void getProductDetails(product.product_id)
  }, [getProductDetails, product.product_id])

  if (isProductDetailsError) {
    return (
      <div className="flex flex-col h-full p-5">
        <p className="flex items-center flex-1 text-xl text-center">{en.products.modal.error}</p>
        <button
          onClick={closeModal}
          className="flex justify-center bg-red-500 hover:bg-red-700 rounded-lg py-2 px-4 text-white transition-colors duration-200"
        >
          {en.global.closeButton}
        </button>
      </div>
    )
  }

  if (isProductDetailsLoading || !productDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-5 gap-5">
        <Icon variant="spinner" size="lg" />
        <p>{en.global.loading}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 h-full gap-4">
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <ImageWithPlaceholder
          size={160}
          key={productDetails.image}
          src={productDetails.image}
          alt={en.products.modal.productImageAltText}
        />
        <div className="flex flex-col justify-between mr-5">
          <div>
            <h3 className="text-xl font-bold">{productDetails.name}</h3>
            <p className="text-2xl font-bold">{formatPrice(productDetails.price)}</p>
          </div>
          <CartButton product={product} />
        </div>
      </div>
      <div className="col-span-2 overflow-y-auto">
        <p className="font-semibold text-gray-500 text-base">{en.products.modal.description}</p>
        <p className="text-sm mb-3">{productDetails.description}</p>
        <p className="font-semibold text-gray-500 text-base">
          {en.products.modal.storageInstructions.title}
        </p>
        <p className="text-sm mb-3">
          {en.products.modal.storageInstructions.part1}
          <span className="lowercase">{productDetails.name}</span>
          {en.products.modal.storageInstructions.part2}
        </p>
        <p className="font-semibold text-gray-500 text-base">
          {en.products.modal.usageSuggestions.title}
        </p>
        <ul className="list-disc list-inside text-sm mb-3">
          <li>{en.products.modal.usageSuggestions.bullet1}</li>
          <li>{en.products.modal.usageSuggestions.bullet2}</li>
          <li>{en.products.modal.usageSuggestions.bullet3}</li>
        </ul>
        <p className="font-semibold text-gray-500 text-base">{en.products.modal.features.title}</p>
        <ul className="list-disc list-inside text-sm mb-3">
          <li>{en.products.modal.features.bullet1}</li>
          <li>{en.products.modal.features.bullet2}</li>
          <li>{en.products.modal.features.bullet3}</li>
          <li>{en.products.modal.features.bullet4}</li>
        </ul>
      </div>
    </div>
  )
}
