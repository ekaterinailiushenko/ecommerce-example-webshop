import { Link } from 'react-router-dom'

import en from '../../../../i18n/en.json'
import emptyCartLogo from '../../../../assets/emptyCartLogo.png'

export const EmptyCart = () => (
  <div className="flex flex-col items-center gap-2 h-[calc(100vh-64px)] justify-center">
    <img
      src={emptyCartLogo}
      alt={en.cart.emptyCart.altText}
      className="size-32"
    />
    <p className="font-bold text-2xl">{en.cart.emptyCart.mainMessage}</p>
    <p className="text-md text-slate-600">{en.cart.emptyCart.nextMessage}</p>
    <Link
      to={`/`}
      className="shadow bg-green-500 hover:bg-green-400 text-white text-xs py-2 rounded-md flex justify-center gap-1 w-64 mt-2"
    >
      <p className="text-sm font-bold">{en.cart.emptyCart.linkToMainPage}</p>
    </Link>
  </div>
)
