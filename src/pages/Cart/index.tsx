import { useCartContext } from '../../contexts/CartContext/hook'
import { CartHeader, CartItem, CartSummary, EmptyCart } from './components'

export const Cart = () => {
  const cartItems = useCartContext().cartSummary?.products

  if (!cartItems?.length) {
    return <EmptyCart />
  }

  return (
    <div className="py-5 px-14 min-h-[calc(100vh-64px)]">
      <CartHeader />
      <section className="grid lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3 flex flex-col gap-1">
          {cartItems.map(item => (
            <CartItem key={item.product_id} item={item} />
          ))}
        </div>
        <CartSummary />
      </section>
    </div>
  )
}
