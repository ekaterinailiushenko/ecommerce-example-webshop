import { BsCart2 } from 'react-icons/bs'
import { useCartStore } from '../store/useCartStore'
import { ProductType } from '../store/useProductsStore'
import { useAtomValue } from 'jotai'
import { userAtom } from '../store/authStore'

export const AddToCartButton = ({ product }: { product: ProductType }) => {
  const addItemToCart = useCartStore(state => state.addItemToCart)
  const user = useAtomValue(userAtom)

  const handleAddItemToCardClick = () => {
    user ? addItemToCart(product) : alert('Please log in to add items to cart')
  }

  return (
    <button
      className="bg-green-500 hover:bg-green-400 text-white text-xs py-2 rounded flex justify-center gap-1"
      onClick={handleAddItemToCardClick}
    >
      <BsCart2 className="text-sm" />
      Add to cart
    </button>
  )
}
