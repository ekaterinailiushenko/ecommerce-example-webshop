import en from '../../../../../i18n/en.json'
import { ProductCardModal } from './ProductCardModal'
import { formatPrice } from '../../../../../utilities'
import type { Product } from '../../../../../api/types'
import { CartButton } from '../../../../../uikit/CartButton'
import { useModalContext } from '../../../../../contexts/ModalContext/hook'

export const ProductCard = ({ product }: { product: Product }) => {
  const { openModal } = useModalContext()

  const handleOpenModalClick = () => {
    openModal({
      content: <ProductCardModal product={product} />,
    })
  }

  return (
    <div className="min-h-68 bg-white shadow-md rounded flex flex-col p-5">
      <h5 className="font-semibold text-lg self-start">{product.name}</h5>
      <div className="group/item w-3/5 h-3/5 flex items-center justify-center self-center transition-all hover:scale-110 duration-700 ">
        <img src={product.image} alt={en.products.productImageAltText} className="object-contain" />
        <button
          className="bg-white opacity-80 text-black text-sm font-semibold px-3 py-1 rounded group/button invisible group-hover/item:visible absolute"
          onClick={handleOpenModalClick}
        >
          {en.products.quickView}
        </button>
      </div>
      <h5 className="self-end mb-4 font-semibold">{formatPrice(product.pricePerProduct)}</h5>
      <CartButton product={product} />
    </div>
  )
}
