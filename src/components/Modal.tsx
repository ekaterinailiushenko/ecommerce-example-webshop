import { useAtomValue } from 'jotai'
import { BsCartPlus } from 'react-icons/bs'
import { userAtom } from '../store/authStore'

export const Modal = ({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) => {
  const user = useAtomValue(userAtom)

  return (
    <div
      onClick={onClose}
      className={`
          fixed inset-0 flex justify-center items-center transition-colors
          ${open ? 'visible bg-black/75' : 'invisible'}
        `}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`
      bg-white rounded-2xl p-6 transition-all flex flex-col  items-center
      ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
    `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </button>
        {children}
        {user && (
          <button>
            <BsCartPlus className="p-1 rounded-lg text-4xl hover:bg-gray-50 hover:text-indigo-700" />
          </button>
        )}
      </div>
    </div>
  )
}
