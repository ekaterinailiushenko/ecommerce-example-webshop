import {
  formatPrice,
  calculateTotal,
  calculateItemsInCart,
  calculateTotalWithDelivery,
} from '../../../../utilities'
import en from '../../../../i18n/en.json'
import { useCartStore } from '../../../../stores'

export const CartSummary = () => {
  const cartItems = useCartStore(state => state.cartItems)
  const deliveryCosts = useCartStore(state => state.deliveryCosts)

  return (
    <section className="bg-white p-6 rounded-lg shadow-md h-min">
      <div className="flex justify-between items-baseline">
        <p className="font-bold text-3xl">{en.cart.summary}</p>
        <p className="text-slate-600">
          ({calculateItemsInCart(cartItems)} {en.cart.productItems})
        </p>
      </div>
      <div className="my-4 h-px bg-slate-300"></div>
      <div>
        <div className="flex justify-between">
          <p className="text-slate-600">{en.cart.yourItems}</p>
          <p className="text-slate-600">
            {formatPrice(calculateTotal(cartItems))}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-slate-600">{en.cart.deliveryCosts}</p>
          <p className="text-slate-600">{formatPrice(deliveryCosts)}</p>
        </div>
      </div>
      <div className="my-4 h-px bg-slate-300"></div>
      <div className="flex justify-between">
        <div className="flex items-baseline gap-1">
          <p className="font-bold text-xl">{en.cart.total}</p>
          <p className="text-xs text-slate-600">{en.cart.inclVAT}</p>
        </div>
        <p className="font-bold">
          {formatPrice(calculateTotalWithDelivery(cartItems, deliveryCosts))}
        </p>
      </div>
      <button className="mt-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 rounded-md w-full shadow">
        {en.cart.buttons.buyNow.title}
      </button>
    </section>
  )
}
