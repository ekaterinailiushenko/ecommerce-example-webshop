import { useState } from 'react'

import en from '../../../../../i18n/en.json'
import { Modal } from '../../../../../uikit/Modal'
import { formatPrice } from '../../../../../utilities'
import type { Product } from '../../../../../api/types'
import { CartButton } from '../../../../../uikit/CartButton'
import { useProductContext } from '../../../../../contexts/ProductContext/hook'

export const ProductCard = ({ product }: { product: Product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { getProductDetails } = useProductContext()

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
            alt={en.products.productImageAltText}
            className="object-contain"
          />
          <button
            className="bg-white opacity-80 text-black text-sm font-semibold px-3 py-1 rounded group/button invisible group-hover/item:visible absolute"
            onClick={() => handleOpenModalClick(product.product_id)}
          >
            {en.products.quickView}
          </button>
        </div>
        <h5 className="self-end mb-4 font-semibold">{formatPrice(product.pricePerProduct)}</h5>
        <CartButton product={product} />
      </div>
      <Modal isOpen={isModalOpen} product={product} onClickClose={() => setIsModalOpen(false)} />
    </>
  )
}
