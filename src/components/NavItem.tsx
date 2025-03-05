import { Link } from 'react-router'
import classNames from 'classnames'

import { Text, Icon, Container } from '../uikit'

export namespace NavItem {
  export interface Props {
    to: string
    variant: keyof typeof variantClasses
    icon: Icon.Props['variant']

    label?: string | Children
    /**
     * @default sm
     */
    iconSize?: Icon.Props['size']
    /**
     * @default m
     */
    textSize?: Text.Props['size']
    className?: string
  }
}

const variantClasses = {
  horizontal: 'flex items-center font-semibold hover:bg-grey6 rounded-lg pl-2 pr-4 py-1 gap-1.5',
  vertical: 'flex flex-col items-center justify-between font-semibold text-grey2 hover:text-green3',
  minimalist: 'flex items-center gap-2 text-grey3 hover:text-green3 text-sm',
  icon: '',
}

export const NavItem = ({
  to,
  variant,
  label,
  icon,
  iconSize,
  textSize,
  className,
}: NavItem.Props) => {
  return (
    <Link to={to}>
      <Container className={classNames(variantClasses[variant], className)}>
        <Icon variant={icon} size={iconSize} />
        {typeof label === 'string' ? <Text text={label} size={textSize} /> : label}
      </Container>
    </Link>
  )
}
