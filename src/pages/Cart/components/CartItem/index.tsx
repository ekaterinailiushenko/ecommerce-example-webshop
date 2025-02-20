import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '../../../../uikit'
import { logger } from '../../../../utilities'
import type { Product } from '../../../../api/types'
import { useCartContext } from '../../../../contexts/CartContext/hook'
import { ProductQuantityInCartButton } from '../ProductQuantityInCartButton'

const REMOVAL_DELAY = 5000

export const CartItem = ({ item }: { item: Product }) => {
  const { t } = useTranslation()

  const removalTimerRef = useRef<NodeJS.Timeout>(null)

  const [isRemoving, setIsRemoving] = useState(false)

  const { deleteProductFromCart } = useCartContext()

  const clearRemovalTimer = () => {
    if (removalTimerRef.current !== null) {
      clearTimeout(removalTimerRef.current)
    }
  }

  useEffect(() => {
    return () => {
      clearRemovalTimer()
    }
  }, [])

  const handleDeleteClick = () => {
    setIsRemoving(true)
    clearRemovalTimer()

    removalTimerRef.current = setTimeout(async () => {
      try {
        await deleteProductFromCart({ productId: item.product_id, removeAll: true })
      } catch (error) {
        logger.error('Error deleting product from cart:', error)
      } finally {
        setIsRemoving(false)
      }
    }, REMOVAL_DELAY)
  }

  const handleUndoDeleteClick = () => {
    setIsRemoving(false)
    clearRemovalTimer()
  }

  return (
    <section
      className="grid lg:grid-cols-6 py-5 px-8 bg-white rounded-lg shadow-md gap-4 min-h-52"
      data-testid="cart-item"
      key={item.product_id}
    >
      <img
        src={item.image}
        className={classNames('object-contain place-self-center', isRemoving && 'opacity-50')}
        alt={t('products.productImageAltText')}
      />
      <div className="lg:col-start-2 lg:col-span-4 flex flex-col justify-between">
        <p className={classNames('font-bold text-lg', isRemoving && 'opacity-50')}>{item.name}</p>
        <p className={classNames('text-sm text-slate-600', isRemoving && 'opacity-50')}>
          {t('cart.deliveryTime')}
        </p>
        <ProductQuantityInCartButton
          productId={item.product_id}
          isRemoving={isRemoving}
          onUndo={handleUndoDeleteClick}
        />
      </div>
      <div className="flex justify-end items-start">
        <button onClick={handleDeleteClick} disabled={isRemoving} data-testid="remove-from-cart">
          <Icon variant="cross" size="md" className={classNames(isRemoving && 'invisible')} />
        </button>
      </div>
    </section>
  )
}

CartItem.removalDelay = REMOVAL_DELAY
