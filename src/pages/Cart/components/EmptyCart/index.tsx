import { Link } from 'react-router-dom'

import en from '../../../../i18n/en.json'
import { Button } from '../../../../uikit'
import { Routes } from '../../../../router/config'
import emptyCartLogo from '../../../../assets/emptyCartLogo.png'

export const EmptyCart = () => (
  <div className="flex flex-col flex-1 items-center gap-2 justify-center">
    <img src={emptyCartLogo} alt={en.cart.emptyCart.altText} className="size-32" />
    <p className="font-bold text-2xl">{en.cart.emptyCart.mainMessage}</p>
    <p className="text-md text-slate-600">{en.cart.emptyCart.nextMessage}</p>
    <Link to={Routes.HOME_PAGE_URL}>
      <Button variant="success" label={en.cart.emptyCart.linkToMainPage} size="regular" />
    </Link>
  </div>
)
