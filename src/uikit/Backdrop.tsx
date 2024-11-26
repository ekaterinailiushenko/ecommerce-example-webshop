import classNames from 'classnames'

import { Container } from './Container'

export namespace Backdrop {
  export interface Props {
    children: Children
    onClick: () => void
    isVisible: boolean
  }
}

export const Backdrop = ({ children, onClick, isVisible }: Backdrop.Props) => {
  return (
    <Container
      onClick={onClick}
      className={classNames(
        'fixed inset-0 transition-colors z-50',
        isVisible ? 'visible bg-black/50' : 'invisible'
      )}
    >
      {children}
    </Container>
  )
}
