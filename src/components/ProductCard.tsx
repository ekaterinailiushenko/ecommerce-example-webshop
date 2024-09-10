import { useState } from 'react'

import { Modal } from './Modal'
import { AddToCartButton } from './AddToCartButton'
import { LoadingSkeleton } from './LoadingSkeleton'
import { formatPrice } from '../utilities/formatPrice'
import type { ProductType } from '../store/useProductsStore'
import { useProductDetailsStore } from '../store/useProductDetailsStore'

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
            alt="ProductImage"
            className="object-contain"
          />
          <button
            className="bg-white opacity-80 text-black text-sm font-semibold px-3 py-1 rounded group/button invisible group-hover/item:visible absolute"
            onClick={() => handleOpenModalClick(product.product_id)}
          >
            Quick view
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
              <img className="h-40" alt="Product" src={productDetails?.image} />
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
                Product Description
              </p>
              <p className="text-sm mb-3">{productDetails?.description}</p>
              <p className="font-semibold text-gray-500 text-base">
                Storage Instructions
              </p>
              <p className="text-sm mb-3">
                To maintain freshness, store{' '}
                <span className="lowercase ">{productDetails?.name}</span> in a
                cool, dry place. For best results, keep refrigerated and consume
                within a few days of purchase.
              </p>
              <p className="font-semibold text-gray-500 text-base">
                Usage Suggestions
              </p>
              <ul className="list-disc list-inside text-sm mb-3">
                <li>
                  Perfect for Salads: Add a fresh, crisp texture to your
                  favorite salad mix.
                </li>
                <li>
                  Great for Cooking: Enhances the flavor of your soups, stews,
                  and stir-fries.
                </li>
                <li>
                  Healthy Snacking: Enjoy as a fresh, low-calorie snack any time
                  of the day.
                </li>
              </ul>
              <p className="font-semibold text-gray-500 text-base">
                Key Features
              </p>
              <ul className="list-disc list-inside text-sm mb-3">
                <li>
                  Freshness Guaranteed: Harvested at the peak of ripeness to
                  ensure the best flavor and texture.
                </li>
                <li>
                  Nutrient-Rich: Packed with vitamins, minerals, and
                  antioxidants that contribute to your overall well-being.
                </li>
                <li>
                  Versatile Ingredient: Ideal for a variety of dishes, from
                  hearty salads and soups to delicious main courses and side
                  dishes.
                </li>
                <li>
                  Ethically Sourced: Responsibly grown with a focus on
                  sustainability and fair trade practices.
                </li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
