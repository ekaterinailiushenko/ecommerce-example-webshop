import { Link } from 'react-router-dom'

import en from '../i18n/en.json'
import { Input } from './Input'
import { NavMenu } from './NavMenu'
import { useProductsStore } from '../stores'
import picnicHeaderLogo from '../assets/picnicHeaderLogo.png'

export const Header = () => {
  const clearSearchInput = useProductsStore(state => state.setSearchItem)

  return (
    <header className="flex justify-between items-center bg-header">
      <Link to={`/`} onClick={() => clearSearchInput('')}>
        <img
          className="size-16"
          src={picnicHeaderLogo}
          alt={en.header.logoAltText}
        />
      </Link>
      <Input />
      <NavMenu />
    </header>
  )
}
