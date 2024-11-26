import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '../../../../uikit'
import en from '../../../../i18n/en.json'
import { CartButton } from '../CartButton'
import { logger } from '../../../../utilities'
import type { Product } from '../../../../api/types'
import { useCartContext } from '../../../../contexts/CartContext/hook'

const REMOVAL_DELAY = 5000

export const CartItem = ({ item }: { item: Product }) => {
  const removalTimerRef = useRef<NodeJS.Timeout>()

  const [isRemoving, setIsRemoving] = useState(false)

  const { deleteProductFromCart } = useCartContext()

  const clearRemovalTimer = () => {
    if (removalTimerRef) {
      clearTimeout(removalTimerRef.current)
    }
  }

  useEffect(() => {
    return () => {
      clearRemovalTimer()
    }
  }, [])

  const handleDeleteClick = (itemId: string) => {
    setIsRemoving(true)
    clearRemovalTimer()

    removalTimerRef.current = setTimeout(async () => {
      try {
        await deleteProductFromCart({ productId: itemId, removeAll: true })
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
      key={item.product_id}
    >
      <img
        src={item.image}
        className={classNames('object-contain place-self-center', isRemoving && 'opacity-50')}
        alt={en.products.productImageAltText}
      />
      <div className="lg:col-start-2 lg:col-span-4 flex flex-col justify-between">
        <p className={classNames('font-bold text-lg', isRemoving && 'opacity-50')}>{item.name}</p>
        <p className={classNames('text-sm text-slate-600', isRemoving && 'opacity-50')}>
          {en.cart.deliveryTime}
        </p>
        <CartButton product={item} isRemoving={isRemoving} onUndo={handleUndoDeleteClick} />
      </div>
      <div className="flex justify-end items-start">
        <button onClick={() => handleDeleteClick(item.product_id)} disabled={isRemoving}>
          <Icon variant="cross" size="md" className={classNames(isRemoving && 'invisible')} />
        </button>
      </div>
    </section>
  )
}
