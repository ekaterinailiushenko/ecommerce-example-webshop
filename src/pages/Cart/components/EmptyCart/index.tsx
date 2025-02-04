import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '../../../../uikit'
import { Routes } from '../../../../router/config'
import emptyCartLogo from '../../../../assets/emptyCartLogo.png'

export const EmptyCart = () => {
  const { t } = useTranslation()

  return (
    <div
      className="flex flex-col flex-1 items-center gap-2 justify-center"
      data-testid="empty-cart"
    >
      <img src={emptyCartLogo} alt={t('cart.emptyCart.altText')} className="size-32" />
      <p className="font-bold text-2xl">{t('cart.emptyCart.mainMessage')}</p>
      <p className="text-md text-slate-600">{t('cart.emptyCart.secondaryMessage')}</p>
      <Link to={Routes.HOME_PAGE_URL}>
        <Button variant="success" label={t('cart.emptyCart.linkToMainPage')} size="regular" />
      </Link>
    </div>
  )
}
