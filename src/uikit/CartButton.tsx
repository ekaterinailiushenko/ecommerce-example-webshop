import { BsCart2 } from 'react-icons/bs'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import en from '../i18n/en.json'
import { formatPrice } from '../utilities'
import type { Product } from '../api/types'
import { useCartContext } from '../contexts/CartContext/hook'

type Props = {
  product: Product
  isRemoving?: boolean
  onUndo?: () => void
}

export const CartButton = ({ product, isRemoving, onUndo }: Props) => {
  const {
    addProductToCart,
    deleteProductFromCart: decreaseQuantity,
    cartSummary: { products: cartItems } = {},
  } = useCartContext()

  const itemInCart = cartItems?.find(
    cartItem => cartItem.product_id === product.product_id,
  )

  const renderButtonContent = () => {
    if (isRemoving) {
      return (
        <button
          onClick={onUndo}
          className="flex items-center justify-center w-full h-full hover:bg-green-400 rounded-md transition"
        >
          <div className="absolute top-0 left-0 h-full bg-green-600 rounded-md fill-progress-bar" />
          <p className="text-white font-bold z-50">
            {en.cart.buttons.undoRemoveFromCart.title}
          </p>
        </button>
      )
    }
    if (itemInCart) {
      return (
        <div className="flex justify-between items-center w-full h-full">
          <button
            onClick={() => decreaseQuantity({ productId: product.product_id })}
          >
            <div className="flex items-center opacity-70 hover:opacity-100 transition">
              {itemInCart.amountInCart > 1 ? (
                <AiOutlineMinus className="text-lg mx-2" />
              ) : (
                <RiDeleteBin6Line className="text-lg mx-2" />
              )}

              <div className="h-9 border-l border-green-300 opacity-30"></div>
            </div>
          </button>
          <div className="flex flex-col items-center justify-center leading-none w-full h-full">
            <p className="font-bold tracking-tight">
              {itemInCart.amountInCart}
            </p>
            <p className="tracking-tight text-green-300 text-xxs">
              {formatPrice(itemInCart.priceForAmountInCart)}
            </p>
          </div>
          <button onClick={() => addProductToCart(product.product_id)}>
            <div className="flex items-center opacity-70 hover:opacity-100 transition">
              <div className="h-9 border-l border-green-300 opacity-20"></div>
              <AiOutlinePlus className="text-lg mx-2" />
            </div>
          </button>
        </div>
      )
    }
    return (
      <button
        className="flex gap-1 w-full h-full items-center justify-center"
        onClick={() => addProductToCart(product.product_id)}
      >
        <BsCart2 className="text-sm" />
        {en.cart.buttons.addToCart.title}
      </button>
    )
  }

  return (
    <div className="shadow bg-green-500 text-white text-xs h-10 rounded-md relative">
      {renderButtonContent()}
    </div>
  )
}
