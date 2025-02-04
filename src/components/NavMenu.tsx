import { useTranslation } from 'react-i18next'

import { NavItem } from './NavItem'
import { Routes } from '../router/config'
import { useCartContext } from '../contexts/CartContext/hook'
import { useAuthContext } from '../contexts/AuthContext/hook'

export const NavMenu = () => {
  const { t } = useTranslation()

  const { user, loading } = useAuthContext()

  const totalItemsInCart = useCartContext().cartSummary.productsQuantity

  if (loading) {
    return <div>{t('global.loading')}</div>
  }

  return (
    <div className="flex gap-4">
      <div className="hover:text-white hover:underline transition">
        <NavItem
          to={user ? Routes.PROFILE_PAGE_URL : Routes.LOGIN_PAGE_URL}
          label={user ? t('header.navMenu.linkToProfile') : t('header.navMenu.linkToLogin')}
          icon="profile"
          iconSize="lg"
        />
      </div>
      <div className="flex flex-col items-center relative hover:text-white hover:underline transition">
        <div className="absolute -right-1.5 -top-1.5 rounded-full h-4 w-4 bg-green-500 text-white flex justify-center items-center">
          <p className="text-xs">{totalItemsInCart}</p>
        </div>
        <NavItem
          to={Routes.CART_PAGE_URL}
          label={t('header.navMenu.linkToCart')}
          icon="cart"
          iconSize="lg"
        />
      </div>
    </div>
  )
}
