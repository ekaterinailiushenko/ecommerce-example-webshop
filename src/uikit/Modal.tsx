import classNames from 'classnames'
import { TfiClose } from 'react-icons/tfi'

import { useModalContext } from '../contexts/ModalContext/hook'

export const Modal = () => {
  const { config, closeModal } = useModalContext()

  const { isOpen, content, fadeDuration } = config

  return (
    <div
      onClick={closeModal}
      className={classNames(
        'fixed inset-0 flex justify-center items-center transition-colors z-50',
        isOpen ? 'visible bg-black/75' : 'invisible'
      )}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={classNames(
          'bg-white w-4/12 h-4/6 rounded-2xl p-6 transition-all ease-in',
          isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        )}
        style={{ transitionDuration: `${fadeDuration}ms` }}
      >
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 rounded-full text-gray-500 bg-gray-100 hover:text-gray-400"
        >
          <TfiClose className="text-xs m-1" />
        </button>
        {content}
      </div>
    </div>
  )
}
