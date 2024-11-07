import { Input } from './Input'
import en from '../i18n/en.json'
import { NavMenu } from './NavMenu'
import { HOME_PAGE_URL } from '../helpers/constants'
import picnicHeaderLogo from '../assets/picnicHeaderLogo.png'

export const Header = () => {
  const goToHomepage = () => {
    window.location.replace(HOME_PAGE_URL)
  }

  return (
    <header className="flex justify-between items-center bg-header">
      <button onClick={goToHomepage}>
        <img className="size-16" src={picnicHeaderLogo} alt={en.header.logoAltText} />
      </button>
      <Input />
      <NavMenu />
    </header>
  )
}
