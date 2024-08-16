import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'
import { IoIosLogIn } from 'react-icons/io'
import { useCartStore } from '../store/useCartStore'
import { loadingAtom, userAtom } from '../store/authStore'
import { MdOutlineShoppingCart, MdAccountCircle } from 'react-icons/md'

export const NavMenu = () => {
  const user = useAtomValue(userAtom)
  const loading = useAtomValue(loadingAtom)

  const cartItems = useCartStore(state => state.cartItems)

  const totalItemsInCart = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    return (
      <div className="flex gap-4 mr-3 ">
        <div className="flex flex-col items-center relative hover:text-white hover:underline">
          <div className="absolute -right-1.5 -top-1.5 rounded-full h-4 w-4 bg-green-500 text-white flex justify-center items-center">
            <p className="text-xs">{totalItemsInCart}</p>
          </div>
          <Link to={'/cart'}>
            <div className="flex flex-col items-center">
              <MdOutlineShoppingCart className="text-white size-8" />
              <p className="text-xs ">Cart</p>
            </div>
          </Link>
        </div>
        <div className="hover:text-white hover:underline">
          <Link to={'/profile'}>
            <div className="flex flex-col items-center">
              <MdAccountCircle className="text-white size-8" />
              <p className="text-xs">Account</p>
            </div>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Link className="size-16 flex justify-center items-center" to={`/login`}>
      <IoIosLogIn color="white" fontSize="3rem" />
    </Link>
  )
}
