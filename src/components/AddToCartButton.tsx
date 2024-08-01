import { BsCart2 } from 'react-icons/bs'

export const AddToCartButton = () => {
  return (
    <button className="bg-green-500 hover:bg-green-400 text-white text-xs py-2 rounded flex justify-center gap-1">
      <BsCart2 className="text-sm" />
      Add to cart
    </button>
  )
}
