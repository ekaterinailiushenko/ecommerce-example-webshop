import { AddToCartButton } from './AddToCartButton'
import { formatPrice } from '../utilities/formatPrice'

export const ProductCard = ({ product, onOpenModal }) => (
  <div className="min-h-68 bg-white shadow-md rounded flex flex-col p-5">
    <h5 className="font-semibold text-lg self-start">{product.name}</h5>
    <div className="group/item w-3/5 h-3/5 flex items-center justify-center self-center transition-all hover:scale-110 duration-700 ">
      <img src={product.image} alt="ProductImage" className="object-contain" />
      <button
        className="bg-white opacity-80 text-black text-sm font-semibold px-3 py-1 rounded group/button invisible group-hover/item:visible absolute"
        onClick={() => onOpenModal(product.product_id)}
      >
        Quick view
      </button>
    </div>
    <h5 className="self-end mb-4 font-semibold">
      {formatPrice(product.price)}
    </h5>
    <AddToCartButton product={product} />
  </div>
)
