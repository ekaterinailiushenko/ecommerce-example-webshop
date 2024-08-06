import { Input } from './Input'
import { Link } from 'react-router-dom'
import picnicHeaderLogo from '../assets/picnicHeaderLogo.png'
import { useAtomValue } from 'jotai'
import { loadingAtom, userAtom } from '../store/authStore'
import { MdAccountCircle } from 'react-icons/md'
import { IoIosLogIn } from 'react-icons/io'
import { useCartStore } from '../store/useCartStore'

export const Header = () => {
  const user = useAtomValue(userAtom)
  const loading = useAtomValue(loadingAtom)

  const cartItems = useCartStore(state => state.cartItems)

  const totalItemsInCart = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  )

  return (
    <header className="flex h-16 justify-between items-center bg-header">
      <Link to={`/`}>
        <img className="size-16" src={picnicHeaderLogo} alt="Logo" />
      </Link>
      <Input />
      {loading ? (
        <span>Loading...</span>
      ) : user ? (
        <div>
          <p>{user.email}</p>
          <Link to={'/profile'}>
            <MdAccountCircle color="white" fontSize="3rem" />
          </Link>
          <p>{totalItemsInCart}</p>
        </div>
      ) : (
        <Link
          className="size-16 flex items-center justify-center"
          to={`/login`}
        >
          <IoIosLogIn color="white" fontSize="3rem" />
        </Link>
      )}
    </header>
  )
}
