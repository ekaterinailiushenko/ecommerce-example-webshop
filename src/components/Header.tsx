import { useTranslation } from 'react-i18next'

import { NavMenu } from './NavMenu'
import { Container } from '../uikit'
import { SearchInput } from './SearchInput'
import headerLogo from '../assets/headerLogo.png'
import { redirectToHomepage } from '../utilities'
import { LanguageSwitcher } from './LanguageSwitcher'

export const Header = () => {
  const { t } = useTranslation()

  return (
    <header className="z-40 sticky top-0">
      <Container className="relative z-40 bg-white flex justify-between items-center gap-4">
        <Container className="flex flex-1 gap-4 items-center sm:mx-20 md:mx-40 my-4 ">
          <button onClick={redirectToHomepage} className="w-40 rounded-lg overflow-hidden">
            <img src={headerLogo} alt={t('header.logoAltText')} />
          </button>
          <SearchInput />
          <LanguageSwitcher />
          <Container className="hidden md:block">
            <NavMenu />
          </Container>
        </Container>
        <Container className="fixed inset-x-0 bottom-0 z-50 flex justify-center w-full bg-white md:hidden">
          <NavMenu />
        </Container>
      </Container>
      <div className="border-b border-outline"></div>
    </header>
  )
}
