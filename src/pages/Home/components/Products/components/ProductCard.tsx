import { useState } from 'react'

import en from '../../../../../i18n/en.json'
import { Modal } from '../../../../../uikit/Modal'
import { formatPrice } from '../../../../../utilities'
import { LoadingSkeleton } from '../../../../../uikit/LoadingSkeleton'
import { AddToCartButton } from '../../../../../uikit/AddToCartButton'
import { type ProductType, useProductDetailsStore } from '../../../../../stores'

export const ProductCard = ({ product }: { product: ProductType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { isLoading, productDetails, getProductDetails } =
    useProductDetailsStore(state => {
      return {
        isLoading: state.isLoading,
        productDetails: state.productDetails,
        getProductDetails: state.getProductDetails,
      }
    })

  const handleOpenModalClick = (id: string) => {
    setIsModalOpen(true)
    void getProductDetails(id)
  }

  return (
    <>
      <div className="min-h-68 bg-white shadow-md rounded flex flex-col p-5">
        <h5 className="font-semibold text-lg self-start">{product.name}</h5>
        <div className="group/item w-3/5 h-3/5 flex items-center justify-center self-center transition-all hover:scale-110 duration-700 ">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain"
          />
          <button
            className="bg-white opacity-80 text-black text-sm font-semibold px-3 py-1 rounded group/button invisible group-hover/item:visible absolute"
            onClick={() => handleOpenModalClick(product.product_id)}
          >
            {en.products.quickView}
          </button>
        </div>
        <h5 className="self-end mb-4 font-semibold">
          {formatPrice(product.price)}
        </h5>
        <AddToCartButton product={product} />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-2 h-full gap-4">
            <div className="flex items-center justify-center">
              <img
                className="h-40"
                alt={productDetails?.name}
                src={productDetails?.image}
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold">{productDetails?.name}</h3>
                <p className="text-2xl font-bold">
                  {formatPrice(productDetails?.price)}
                </p>
              </div>
              <AddToCartButton product={product} />
            </div>
            <div className="col-span-2 overflow-y-auto">
              <p className="font-semibold text-gray-500 text-base">
                {en.products.modal.description}
              </p>
              <p className="text-sm mb-3">{productDetails?.description}</p>
              <p className="font-semibold text-gray-500 text-base">
                {en.products.modal.storageInstructions}
              </p>
              <p className="text-sm mb-3">
                To maintain freshness, store{' '}
                <span className="lowercase">{productDetails?.name}</span> in a
                cool, dry place. For best results, keep refrigerated and consume
                within a few days of purchase.
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
      </Modal>
    </>
  )
}
