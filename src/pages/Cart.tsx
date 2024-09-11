import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TfiClose } from 'react-icons/tfi'

import { useCartStore } from '../store'
import { formatPrice } from '../utilities'
import type { CartProduct } from '../store'
import { AddToCartButton } from '../components'
import emptyCartLogo from '../assets/emptyCartLogo.png'

export const Cart = () => {
  const [removingItem, setRemovingItem] = useState<{
    id: string | null
    confirmed: boolean
  }>({ id: null, confirmed: false })

  const cartItems = useCartStore(state => state.cartItems)
  const removeItemFromCart = useCartStore(state => state.removeItemFromCart)
  const clearCart = useCartStore(state => state.clearCart)

  const totalItemsInCart = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  )

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

  const handleRemoveItemClick = (itemId: string) => {
    setRemovingItem({ id: itemId, confirmed: true })
    setTimeout(() => {
      if (removingItem.id === itemId && removingItem.confirmed) {
        removeItemFromCart(itemId)
        setRemovingItem({ id: null, confirmed: false })
      }
    }, 5000)
  }

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center gap-2 h-[calc(100vh-64px)] justify-center">
        <img src={emptyCartLogo} alt="Empty Cart" className="size-32" />
        <p className="font-bold text-2xl">Your Cart is empty.</p>
        <p className="text-md text-slate-600">
          Looks like you have not added anything to your cart yet.
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
    <div className="py-5 px-14 min-h-[calc(100vh-64px)]">
      <section className="flex gap-2 items-baseline justify-between">
        <div className="flex mb-4 gap-2 items-baseline">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <p className="text-slate-600">({totalItemsInCart} Items)</p>
        </div>
        <button
          onClick={clearCart}
          className="bg-slate-200 px-3 py-1 flex hover:bg-slate-300 rounded"
        >
          Clear Cart
        </button>
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
                className={`object-contain place-self-center ${removingItem.id === item.product_id && 'opacity-50'}`}
                alt={item.name}
              />
              <div className="lg:col-start-2 lg:col-span-4 flex flex-col justify-between">
                <p
                  className={`font-bold text-lg ${removingItem.id === item.product_id && 'opacity-50'}`}
                >
                  {item.name}
                </p>
                <p
                  className={`text-sm text-slate-600 ${removingItem.id === item.product_id && 'opacity-50'}`}
                >
                  Delivery: 1-3 working days
                </p>
                <AddToCartButton
                  product={item}
                  isItemRemoving={removingItem}
                  setRemovingItem={setRemovingItem}
                />
              </div>
              <div className="flex justify-end items-start">
                <button onClick={() => handleRemoveItemClick(item.product_id)}>
                  <TfiClose
                    className={`text-slate-400 hover:text-slate-500 text-xl transition ${removingItem.id === item.product_id && 'invisible'}`}
                  />
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
