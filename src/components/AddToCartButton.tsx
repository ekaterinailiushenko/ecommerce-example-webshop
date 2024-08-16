import { BsCart2 } from 'react-icons/bs'
import { useCartStore } from '../store/useCartStore'
import { ProductType } from '../store/useProductsStore'
import { useAtomValue } from 'jotai'
import { userAtom } from '../store/authStore'
import { AddedToCartOverlay } from './AddedToCartOverlay'

export const AddToCartButton = ({ product }: { product: ProductType }) => {
  const addItemToCart = useCartStore(state => state.addItemToCart)
  const user = useAtomValue(userAtom)

  const handleAddItemToCardClick = () => {
    user ? addItemToCart(product) : alert('Please log in to add items to cart')
  }

  return (
    <>
      <button
        className="shadow bg-green-500 hover:bg-green-400 text-white text-xs py-2 rounded-md flex justify-center gap-1"
        onClick={handleAddItemToCardClick}
      >
        <BsCart2 className="text-sm" />
        Add to cart
      </button>
      <AddedToCartOverlay>
        <div className="p-4">
          <p className="text-gray-800 dark:text-neutral-400">
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </p>
        </div>
      </AddedToCartOverlay>
    </>
  )
}
