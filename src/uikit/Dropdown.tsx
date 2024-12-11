import classNames from 'classnames'

import { Container } from './Container'

export namespace Dropdown {
  export interface Props {
    children: Children

    className?: string
  }
}

export const Dropdown = ({ children, className }: Dropdown.Props) => {
  return (
    <Container
      className={classNames(
        className,
        'min-w-fit absolute top-17 right-0 bg-white shadow rounded-2xl'
      )}
    >
      {children}
    </Container>
  )
}
