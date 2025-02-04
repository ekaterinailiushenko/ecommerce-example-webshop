import { useTranslation } from 'react-i18next'

import { useCartContext } from '../../../../contexts/CartContext/hook'

export const CartHeader = () => {
  const { t } = useTranslation()

  const { clearCart, cartSummary: { productsQuantity } = {} } = useCartContext()

  return (
    <section className="flex gap-2 items-baseline justify-between" data-testid="cart-header">
      <div className="flex mb-4 gap-2 items-baseline">
        <h1 className="text-3xl font-bold">{t('cart.title')}</h1>
        <p className="text-slate-600">{t('cart.productItems', { count: productsQuantity })}</p>
      </div>
      <button
        onClick={clearCart}
        className="bg-slate-200 px-3 py-1 flex hover:bg-slate-300 rounded"
      >
        {t('cart.buttons.clearCart.title')}
      </button>
    </section>
  )
}
