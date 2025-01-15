import { Link } from 'react-router'

import { Text, Icon, Container } from '../uikit'

export namespace NavItem {
  export interface Props {
    to: string
    label: string
    icon: Icon.Props['variant']

    iconSize?: Icon.Props['size']
  }
}

export const NavItem = ({ to, label, icon, iconSize }: NavItem.Props) => {
  return (
    <Link to={to}>
      <Container className="flex flex-col items-center">
        <Icon variant={icon} size={iconSize} />
        <Text text={label} size="xs" />
      </Container>
    </Link>
  )
}
