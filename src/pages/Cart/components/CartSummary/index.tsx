import en from '../../../../i18n/en.json'
import { Button } from '../../../../uikit'
import { formatPrice } from '../../../../utilities'
import { useCartContext } from '../../../../contexts/CartContext/hook'

export const CartSummary = () => {
  const { cartSummary } = useCartContext()

  if (!cartSummary) {
    return <p>{en.global.loading}</p>
  }

  const { totalPrice, deliveryCosts, totalPriceWithDeliveryCosts, productsQuantity } = cartSummary

  return (
    <section className="bg-white p-6 rounded-lg shadow-md h-min">
      <div className="flex justify-between items-baseline">
        <p className="font-bold text-3xl">{en.cart.summary}</p>
        <p className="text-slate-600">
          ({productsQuantity} {en.cart.productItems})
        </p>
      </div>
      <div className="my-4 h-px bg-slate-300"></div>
      <div>
        <div className="flex justify-between">
          <p className="text-slate-600">{en.cart.yourItems}</p>
          <p className="text-slate-600">{formatPrice(totalPrice)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-slate-600">{en.cart.deliveryCosts}</p>
          <p className="text-slate-600">{formatPrice(deliveryCosts)}</p>
        </div>
      </div>
      <div className="my-4 h-px bg-slate-300"></div>
      <div className="flex justify-between mb-4">
        <div className="flex items-baseline gap-1">
          <p className="font-bold text-xl">{en.cart.total}</p>
          <p className="text-xs text-slate-600">{en.cart.inclVAT}</p>
        </div>
        <p className="font-bold">{formatPrice(totalPriceWithDeliveryCosts)}</p>
      </div>
      <Button variant="success" size="large" label={en.cart.buttons.buyNow.title} />
    </section>
  )
}
