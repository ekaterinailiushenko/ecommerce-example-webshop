import { Link } from 'react-router-dom'

import { Input } from './Input'
import en from '../i18n/en.json'
import { NavMenu } from './NavMenu'
import { refreshPage } from '../utilities/refreshPage'
import picnicHeaderLogo from '../assets/picnicHeaderLogo.png'

export const Header = () => {
  return (
    <header className="flex justify-between items-center bg-header">
      <Link to={`/`} onClick={refreshPage}>
        <img className="size-16" src={picnicHeaderLogo} alt={en.header.logoAltText} />
      </Link>
      <Input />
      <NavMenu />
    </header>
  )
}
