import { useEffect } from 'react'
import classNames from 'classnames'

import { Button } from './Button'
import { Backdrop } from './Backdrop'
import { Container } from './Container'
import { useModalContext } from '../contexts/ModalContext/hook'

export const Modal = () => {
  const { config, closeModal } = useModalContext()

  const { isOpen, content, fadeDuration } = config

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  return (
    <Backdrop onClick={closeModal} isVisible={isOpen}>
      <Container
        onClick={e => e.stopPropagation()}
        className={classNames(
          'bg-white absolute inset-x-0 bottom-0 rounded-t-xl p-6 transition-all ease-out',
          'md:inset-0 md:place-self-center md:rounded-md md:max-w-[700px] md:max-h-[550px]',
          isOpen ? 'translate-y-2 opacity-100' : '-translate-y-2 opacity-0'
        )}
        style={{ transitionDuration: `${fadeDuration}ms` }}
      >
        <Button
          variant="icon"
          icon="cross"
          iconSize="xs"
          onClick={closeModal}
          className="absolute top-4 right-4"
        />
        {content}
      </Container>
    </Backdrop>
  )
}
