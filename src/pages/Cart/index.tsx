import { useCartStore } from '../../stores'
import { CartHeader, CartItem, CartSummary, EmptyCart } from './components'

export const Cart = () => {
  const cartItems = useCartStore(state => state.cartItems)

  if (!cartItems.length) {
    return <EmptyCart />
  }

  return (
    <div className="py-5 px-14 min-h-[calc(100vh-64px)]">
      <CartHeader />
      <section className="grid lg:grid-cols-4 gap-5">
        <CartItem />
        <CartSummary />
      </section>
    </div>
  )
}
