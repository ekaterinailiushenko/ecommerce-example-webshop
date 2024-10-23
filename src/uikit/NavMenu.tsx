import { Link } from 'react-router-dom'
import { MdOutlineShoppingCart, MdAccountCircle } from 'react-icons/md'

import en from '../i18n/en.json'
import { useAuthStore } from '../stores'
import { useCartContext } from '../contexts/CartContext/hook'

export const NavMenu = () => {
  const { user, loading } = useAuthStore(state => ({
    user: state.user,
    loading: state.loading,
  }))

  const totalItemsInCart = useCartContext().cartSummary?.productsQuantity

  if (loading) {
    return <div>{en.global.loading}</div>
  }

  return (
    <div className="flex gap-4 mr-3 ">
      <div className="hover:text-white hover:underline transition">
        <Link to={user ? '/profile' : '/login'}>
          <div className="flex flex-col items-center">
            <MdAccountCircle className="text-white size-8" />
            <p className="text-xs">
              {user
                ? en.header.navMenu.linkToProfile
                : en.header.navMenu.linkToLogin}
            </p>
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center relative hover:text-white hover:underline transition">
        <div className="absolute -right-1.5 -top-1.5 rounded-full h-4 w-4 bg-green-500 text-white flex justify-center items-center">
          <p className="text-xs">{user ? totalItemsInCart : 0}</p>
        </div>
        <Link to={'/cart'}>
          <div className="flex flex-col items-center">
            <MdOutlineShoppingCart className="text-white size-8" />
            <p className="text-xs ">{en.header.navMenu.linkToCart}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
