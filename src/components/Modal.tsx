import { TfiClose } from 'react-icons/tfi'

export const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) => {
  return (
    <div
      onClick={onClose}
      className={`
          fixed inset-0 flex justify-center items-center transition-colors z-50
          ${isOpen ? 'visible bg-black/75' : 'invisible'}
        `}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`
      bg-white w-4/12 h-4/6 rounded-2xl p-6 transition-all duration-300 ease-in 
      ${isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
    `}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 rounded-full text-gray-500 bg-gray-100 hover:text-gray-400 transition-colors duration-300"
        >
          <TfiClose className="text-xs m-1" />
        </button>
        {children}
      </div>
    </div>
  )
}
