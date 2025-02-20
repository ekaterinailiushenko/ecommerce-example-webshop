import { useTranslation } from 'react-i18next'

import { Icon } from '../../../../uikit'
import { formatPrice } from '../../../../utilities'
import type { Product } from '../../../../api/types'
import { useCartContext } from '../../../../contexts/CartContext/hook'

type Props = {
  productId: Product['product_id']
  isRemoving?: boolean
  onUndo?: () => void
}

export const ProductQuantityInCartButton = ({ productId, isRemoving, onUndo }: Props) => {
  const { t } = useTranslation()

  const {
    addProductToCart,
    deleteProductFromCart: decreaseQuantity,
    cartSummary: { products: cartItems } = {},
  } = useCartContext()

  const itemInCart = cartItems?.find(cartItem => cartItem.product_id === productId)

  const renderButtonContent = () => {
    if (isRemoving) {
      return (
        <button
          onClick={onUndo}
          className="flex items-center justify-center w-full h-full hover:bg-green-400 rounded-md transition"
        >
          <div className="absolute top-0 left-0 h-full bg-green-600 rounded-md fill-progress-bar" />
          <p className="text-white font-bold z-50">{t('cart.buttons.undoRemoveFromCart.title')}</p>
        </button>
      )
    }
    if (itemInCart) {
      return (
        <div className="flex justify-between items-center w-full h-full">
          <button
            onClick={() => decreaseQuantity({ productId: productId })}
            data-testid="decrease-quantity"
          >
            <div className="flex items-center opacity-70 hover:opacity-100 transition">
              {itemInCart.amountInCart > 1 ? <Icon variant="minus" /> : <Icon variant="bin" />}

              <div className="h-9 border-l border-green-300 opacity-30 mx-2"></div>
            </div>
          </button>
          <div className="flex flex-col items-center justify-center leading-none w-full h-full">
            <p className="font-bold tracking-tight">{itemInCart.amountInCart}</p>
            <p className="tracking-tight text-green-300 text-xxs">
              {formatPrice(itemInCart.priceForAmountInCart)}
            </p>
          </div>
          <button onClick={() => addProductToCart(productId)} data-testid="increase-quantity">
            <div className="flex items-center opacity-70 hover:opacity-100 transition">
              <div className="h-9 border-l border-green-300 opacity-20 mx-2"></div>
              <Icon variant="plus" />
            </div>
          </button>
        </div>
      )
    }
    return (
      <button
        className="flex gap-1 w-full h-full items-center justify-center"
        onClick={() => addProductToCart(productId)}
      >
        <Icon variant="cart" size="sm" />
        {t('cart.buttons.addToCart.title')}
      </button>
    )
  }

  return (
    <div className="shadow bg-green6 text-white text-xs h-10 rounded-lg px-2 relative">
      {renderButtonContent()}
    </div>
  )
}
