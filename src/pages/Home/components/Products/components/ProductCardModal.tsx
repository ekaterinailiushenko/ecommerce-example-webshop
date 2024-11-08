import en from '../../../../../i18n/en.json'
import { formatPrice } from '../../../../../utilities'
import type { Product } from '../../../../../api/types'
import { CartButton, LoadingSkeleton } from '../../../../../uikit'
import { useProductContext } from '../../../../../contexts/ProductContext/hook'

export const ProductCardModal = ({ product }: { product: Product }) => {
  const { isLoading, productDetails } = useProductContext()

  if (isLoading || !productDetails) {
    return <LoadingSkeleton />
  }

  return (
    <div className="grid grid-cols-2 h-full gap-4">
      <div className="flex items-center justify-center">
        <img
          className="h-40"
          key={productDetails.image}
          src={productDetails.image}
          alt={en.products.modal.productImageAltText}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold">{productDetails.name}</h3>
          <p className="text-2xl font-bold">{formatPrice(productDetails.price)}</p>
        </div>
        <CartButton product={product} />
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
