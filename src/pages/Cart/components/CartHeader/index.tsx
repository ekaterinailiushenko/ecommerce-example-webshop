import en from '../../../../i18n/en.json'
import { useCartContext } from '../../../../contexts/CartContext/hook'

export const CartHeader = () => {
  const clearCart = useCartContext().clearCart
  const productsQuantity = useCartContext().cartSummary?.productsQuantity

  return (
    <section className="flex gap-2 items-baseline justify-between">
      <div className="flex mb-4 gap-2 items-baseline">
        <h1 className="text-3xl font-bold">{en.cart.title}</h1>
        <p className="text-slate-600">
          ({productsQuantity} {en.cart.productItems})
        </p>
      </div>
      <button
        onClick={clearCart}
        className="bg-slate-200 px-3 py-1 flex hover:bg-slate-300 rounded"
      >
        {en.cart.buttons.clearCart.title}
      </button>
    </section>
  )
}
