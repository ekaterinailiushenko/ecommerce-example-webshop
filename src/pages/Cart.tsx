import { TfiClose } from 'react-icons/tfi'
import { formatPrice } from '../utilities/formatPrice'
import { CartProduct, useCartStore } from '../store/useCartStore'
import emptyCartLogo from '../assets/emptyCartLogo.png'
import { Link } from 'react-router-dom'

export const Cart = () => {
  const cartItems = useCartStore(state => state.cartItems)
  const increaseQuantity = useCartStore(state => state.increaseQuantity)
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity)
  const removeItemFromCart = useCartStore(state => state.removeItemFromCart)

  const totalItemsInCart = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  )

  const calculateItemTotal = (price: number, quantity: number) => {
    return price * quantity
  }

  const calculateOverallTotal = (cartItems: CartProduct[]) => {
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
    return total
  }

  const deliveryCosts = 555

  const calculateTotalWithDeliveryCosts = () => {
    const total = calculateOverallTotal(cartItems)

    return formatPrice(total + deliveryCosts)
  }

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center gap-2">
        <img src={emptyCartLogo} alt="Empty Cart" className="size-32" />
        <p className="font-bold text-2xl">Your Cart is empty.</p>
        <p className="text-md text-slate-600">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to={`/`}
          className="shadow bg-green-500 hover:bg-green-400 text-white text-xs py-2 rounded-md flex justify-center gap-1 w-64 mt-2"
        >
          <p className="text-sm font-bold">Start Shopping</p>
        </Link>
      </div>
    )
  }

  return (
    <div className="my-5 mx-14">
      <section className="flex gap-2 items-baseline">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-slate-600">({totalItemsInCart} Items)</p>
      </section>
      <section className="grid lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3 flex flex-col gap-1">
          {cartItems.map(item => (
            <section
              className="grid lg:grid-cols-6 py-5 px-8 bg-white rounded-lg shadow-md gap-4 min-h-52"
              key={item.product_id}
            >
              <img
                src={item.image}
                className="object-contain place-self-center"
                alt={item.name}
              />
              <div className="lg:col-start-2 lg:col-span-4 flex flex-col justify-between">
                <p className="font-bold text-lg">{item.name}</p>
                <p className="text-sm text-slate-600">
                  Delivery: 1-3 working days
                </p>
                <div className="flex items-center gap-5 pb-1">
                  <div className="flex">
                    <button
                      onClick={() => decreaseQuantity(item.product_id)}
                      className="bg-slate-200 px-3 py-1 flex hover:bg-slate-300"
                    >
                      <p className="font-bold text-lg">-</p>
                    </button>
                    <p className="border border-slate-200 px-3 py-1">
                      {item.quantity}
                    </p>

                    <button
                      onClick={() => increaseQuantity(item.product_id)}
                      className="bg-slate-200 px-3 py-1 flex hover:bg-slate-300"
                    >
                      <p className="font-bold text-lg">+</p>
                    </button>
                  </div>
                  <p className="font-semibold text-lg">
                    {formatPrice(calculateItemTotal(item.price, item.quantity))}
                  </p>
                </div>
              </div>
              <div className="flex justify-end items-start">
                <button onClick={() => removeItemFromCart(item.product_id)}>
                  <TfiClose className="text-slate-400 hover:text-slate-500 text-xl " />
                </button>
              </div>
            </section>
          ))}
        </div>
        <section className="bg-white p-6 rounded-lg shadow-md h-min">
          <div className="flex justify-between items-baseline">
            <p className="font-bold text-3xl">Summary</p>
            <p className="text-slate-600">({totalItemsInCart} Items)</p>
          </div>
          <div className="my-4 h-px bg-slate-300"></div>
          <div>
            <div className="flex justify-between">
              <p className="text-slate-600">Your item(s)</p>
              <p className="text-slate-600">
                {formatPrice(calculateOverallTotal(cartItems))}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-slate-600">Delivery costs</p>
              <p className="text-slate-600">{formatPrice(deliveryCosts)}</p>
            </div>
          </div>
          <div className="my-4 h-px bg-slate-300"></div>
          <div className="flex justify-between">
            <div className="flex items-baseline gap-1">
              <p className="font-bold text-xl">Total</p>
              <p className="text-xs text-slate-600">incl. VAT</p>
            </div>
            <p className="font-bold">{calculateTotalWithDeliveryCosts()}</p>
          </div>
          <button className="mt-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 rounded-md w-full shadow">
            Buy now
          </button>
        </section>
      </section>
    </div>
  )
}
