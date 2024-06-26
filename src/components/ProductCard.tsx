import { FormattedPrice } from "./FormattedPrice";

export const ProductCard = ({ product, onOpenModal }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={() => onOpenModal(product.product_id)}
    className="h-64 bg-white shadow-md rounded flex flex-col"
  >
    <h5 className="font-bold text-lg self-start pl-6 pt-6">{product.name}</h5>
    <img
      className="object-contain w-3/5 h-3/5 self-center"
      src={product.image}
      alt="ProductImage"
    />
    <h5 className="pr-6 pb-6 self-end">
      <FormattedPrice price={product.price} />
    </h5>
  </div>
)
