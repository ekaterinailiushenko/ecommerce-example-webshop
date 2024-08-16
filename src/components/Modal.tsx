import { useAtomValue } from 'jotai'
import { BsCartPlus } from 'react-icons/bs'
import { userAtom } from '../store/authStore'

export const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) => {
  const user = useAtomValue(userAtom)

  return (
    <div
      onClick={onClose}
      className={`
          fixed inset-0 flex justify-center items-center transition-colors 
          ${isOpen ? 'visible bg-black/75' : 'invisible'}
        `}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`
      bg-white rounded-2xl p-6 transition-all flex flex-col items-center duration-300 ease-in
      ${isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
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
