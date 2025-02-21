import classNames from 'classnames'
import { useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'

import { NavItem } from './NavItem'
import { Routes } from '../router/config'
import { formatPrice } from '../utilities'
import { Badge, Container } from '../uikit'
import { useCartContext } from '../contexts/CartContext/hook'
import { useAuthContext } from '../contexts/AuthContext/hook'

export const NavMenu = () => {
  const { t } = useTranslation()

  const location = useLocation()

  const { user, loading } = useAuthContext()

  const { totalPrice } = useCartContext().cartSummary

  const isCartPage = location.pathname === Routes.CART_PAGE_URL

  const cartLabel =
    totalPrice > 0 ? (
      <Badge variant="cart" label={formatPrice(totalPrice) ?? 'N/A'} textSize="s" />
    ) : (
      t('header.navMenu.linkToCart')
    )

  const cartNavLinkClass = classNames(
    totalPrice && '!text-green3',
    !totalPrice && isCartPage && 'hover:!text-black cursor-default',
    isCartPage && 'cursor-default'
  )

  if (loading) {
    return <div>{t('global.loading')}</div>
  }

  return (
    <Container className="flex items-center gap-4">
      <NavItem
        to={user ? Routes.PROFILE_PAGE_URL : Routes.LOGIN_PAGE_URL}
        variant="vertical"
        label={user ? t('header.navMenu.linkToProfile') : t('header.navMenu.linkToLogin')}
        icon="profile"
        iconSize="md"
      />
      <div className="group/item">
        <NavItem
          to={Routes.CART_PAGE_URL}
          variant="vertical"
          label={cartLabel}
          icon="cart"
          iconSize="md"
          className={cartNavLinkClass}
        />
      </div>
    </Container>
  )
}
