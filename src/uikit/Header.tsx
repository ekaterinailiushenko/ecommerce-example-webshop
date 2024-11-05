import { Link, useMatch } from 'react-router-dom'

import { Input } from './Input'
import en from '../i18n/en.json'
import { NavMenu } from './NavMenu'
import { HOME_PAGE_URL } from '../helpers/constants'
import { refreshPage } from '../utilities/refreshPage'
import picnicHeaderLogo from '../assets/picnicHeaderLogo.png'

export const Header = () => {
  const HomePage = useMatch(HOME_PAGE_URL)

  const handleRefreshPage = () => {
    if (HomePage) {
      refreshPage()
    }
  }

  return (
    <header className="flex justify-between items-center bg-header">
      <Link to={HOME_PAGE_URL} onClick={handleRefreshPage}>
        <img className="size-16" src={picnicHeaderLogo} alt={en.header.logoAltText} />
      </Link>
      <Input />
      <NavMenu />
    </header>
  )
}
