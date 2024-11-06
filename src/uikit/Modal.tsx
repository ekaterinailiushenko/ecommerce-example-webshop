import classNames from 'classnames'
import { TfiClose } from 'react-icons/tfi'

import en from '../i18n/en.json'
import { CartButton } from './CartButton'
import { formatPrice } from '../utilities'
import type { Product } from '../api/types'
import { LoadingSkeleton } from './LoadingSkeleton'
import { useProductContext } from '../contexts/ProductContext/hook'

export const Modal = ({
  isOpen,
  product,
  onClickClose,
}: {
  isOpen: boolean
  product: Product
  onClickClose: () => void
}) => {
  const { isLoading, productDetails } = useProductContext()

  return (
    <div
      onClick={onClickClose}
      className={classNames(
        'fixed inset-0 flex justify-center items-center transition-colors z-50',
        isOpen ? 'visible bg-black/75' : 'invisible'
      )}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={classNames(
          'bg-white w-4/12 h-4/6 rounded-2xl p-6 transition-all duration-300 ease-in',
          isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        )}
      >
        <button
          onClick={onClickClose}
          className="absolute top-6 right-6 rounded-full text-gray-500 bg-gray-100 hover:text-gray-400 transition-colors duration-300"
        >
          <TfiClose className="text-xs m-1" />
        </button>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-2 h-full gap-4">
            <div className="flex items-center justify-center">
              <img
                className="h-40"
                alt={en.products.modal.productImageAltText}
                src={productDetails?.image}
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold">{productDetails?.name}</h3>
                <p className="text-2xl font-bold">{formatPrice(productDetails?.price)}</p>
              </div>
              <CartButton product={product} />
            </div>
            <div className="col-span-2 overflow-y-auto">
              <p className="font-semibold text-gray-500 text-base">
                {en.products.modal.description}
              </p>
              <p className="text-sm mb-3">{productDetails?.description}</p>
              <p className="font-semibold text-gray-500 text-base">
                {en.products.modal.storageInstructions.title}
              </p>
              <p className="text-sm mb-3">
                {en.products.modal.storageInstructions.part1}
                <span className="lowercase">{productDetails?.name}</span>
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
              <p className="font-semibold text-gray-500 text-base">
                {en.products.modal.features.title}
              </p>
              <ul className="list-disc list-inside text-sm mb-3">
                <li>{en.products.modal.features.bullet1}</li>
                <li>{en.products.modal.features.bullet2}</li>
                <li>{en.products.modal.features.bullet3}</li>
                <li>{en.products.modal.features.bullet4}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
