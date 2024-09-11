import { BsCart2 } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import en from '../i18n/en.json'
import { formatPrice } from '../utilities'
import { useCartStore, type ProductType } from '../stores'

type Props = {
  product: ProductType
  isItemRemoving?: {
    id: string | null
    confirmed: boolean
  }
  setRemovingItem?: React.Dispatch<
    React.SetStateAction<{
      id: string | null
      confirmed: boolean
    }>
  >
}

export const AddToCartButton = ({
  product,
  isItemRemoving = { id: null, confirmed: false },
  setRemovingItem,
}: Props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const {
    cartItems,
    addItemToCart,
    increaseQuantity,
    decreaseQuantity,
    changeQuantity,
    removeItemFromCart,
  } = useCartStore(state => ({
    cartItems: state.cartItems,
    addItemToCart: state.addItemToCart,
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
    changeQuantity: state.changeQuantity,
    removeItemFromCart: state.removeItemFromCart,
  }))

  const isItemInCart = cartItems.find(
    cartItem => cartItem.product_id === product.product_id
  )

  const [isQuantityChanged, setIsQuantityChanged] = useState(
    isItemInCart?.quantity || 1
  )

  useEffect(() => {
    if (isItemInCart) {
      setIsQuantityChanged(isItemInCart.quantity)
    }
  }, [isItemInCart])

  const handleProgressBarComplete = () => {
    if (isItemRemoving.id === product.product_id && isItemRemoving.confirmed) {
      removeItemFromCart(product.product_id)
      setRemovingItem?.({ id: null, confirmed: false })
    }
  }

  const renderButtonContent = () => {
    if (
      isItemInCart &&
      isItemRemoving &&
      isItemInCart.product_id === isItemRemoving.id
    ) {
      return (
        <button
          onClick={() => setRemovingItem?.({ id: null, confirmed: false })}
          className="flex items-center justify-center w-full h-full hover:bg-green-400 rounded-md transition"
        >
          <div
            className="absolute top-0 left-0 h-full bg-green-600 rounded-md"
            style={{
              animation: `fillProgressBar ${5000}ms linear forwards`,
            }}
            onAnimationEnd={handleProgressBarComplete}
          />
          <p className="text-white font-bold z-50">
            {en.cart.undoRemoveFromCart}
          </p>
        </button>
      )
    }
    if (isItemInCart) {
      return (
        <div className="flex justify-between items-center w-full h-full">
          <button onClick={() => decreaseQuantity(product.product_id)}>
            <div className="flex items-center opacity-70 hover:opacity-100 transition">
              {isItemInCart.quantity > 1 ? (
                <AiOutlineMinus className="text-lg mx-2" />
              ) : (
                <RiDeleteBin6Line className="text-lg mx-2" />
              )}

              <div className="h-9 border-l border-green-300 opacity-30"></div>
            </div>
          </button>
          <button
            className="flex flex-col items-center justify-center leading-none w-full h-full"
            onClick={() => setIsPopupOpen(!isPopupOpen)}
          >
            <p className="font-bold tracking-tight">{isItemInCart.quantity}</p>
            <p className="tracking-tight text-green-300 text-xxs">
              {formatPrice(isItemInCart.price * isItemInCart.quantity)}
            </p>
          </button>
          <button onClick={() => increaseQuantity(product.product_id)}>
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
        onClick={() => addItemToCart(product)}
      >
        <BsCart2 className="text-sm" />
        {en.cart.addToCart}
      </button>
    )
  }

  return (
    <div className="shadow bg-green-500 text-white text-xs h-10 rounded-md relative">
      {renderButtonContent()}
      {isPopupOpen && (
        <div className="absolute -top-16 bg-white border border-green-500 rounded-lg p-2 text-center w-full flex flex-col">
          <p className="text-gray-400">{en.cart.changeQuantity}</p>
          <input
            autoFocus
            type="number"
            value={isQuantityChanged}
            onChange={e => setIsQuantityChanged(Number(e.target.value))}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setIsPopupOpen(false)
                changeQuantity(Number(isQuantityChanged), product.product_id)
              }
            }}
            className="text-black font-bold text-lg text-center outline-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      )}
    </div>
  )
}
