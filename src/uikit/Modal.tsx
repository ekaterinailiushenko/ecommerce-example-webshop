import classNames from 'classnames'

import { Icon } from './Icon'
import { Backdrop } from './Backdrop'
import { Container } from './Container'
import { useModalContext } from '../contexts/ModalContext/hook'

export const Modal = () => {
  const { config, closeModal } = useModalContext()

  const { isOpen, content, fadeDuration } = config

  return (
    <Backdrop onClick={closeModal} isOpen={isOpen}>
      <Container
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
          <Icon variant="TfiClose" className="text-xs m-1" />
        </button>
        {content}
      </Container>
    </Backdrop>
  )
}
