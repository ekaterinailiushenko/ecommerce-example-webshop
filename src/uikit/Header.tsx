import { Link, useLocation } from 'react-router-dom'

import { Input } from './Input'
import en from '../i18n/en.json'
import { NavMenu } from './NavMenu'
import picnicHeaderLogo from '../assets/picnicHeaderLogo.png'

export const Header = () => {
  const location = useLocation()

  return (
    <header className="flex justify-between items-center bg-header" key={location.key}>
      <Link to={`/`}>
        <img className="size-16" src={picnicHeaderLogo} alt={en.header.logoAltText} />
      </Link>
      <Input />
      <NavMenu />
    </header>
  )
}
