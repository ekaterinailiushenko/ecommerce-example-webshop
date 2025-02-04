import { useTranslation } from 'react-i18next'

import { Input } from './Input'
import { NavMenu } from './NavMenu'
import { Routes } from '../router/config'
import picnicHeaderLogo from '../assets/picnicHeaderLogo.png'

export const Header = () => {
  const { t } = useTranslation()

  const goToHomepage = () => {
    window.location.replace(Routes.HOME_PAGE_URL)
  }

  return (
    <>
      <header className="sticky top-0 z-50 flex justify-between items-center gap-4 bg-header px-4">
        <div className="flex flex-1 gap-4 items-center">
          <button onClick={goToHomepage}>
            <img
              className="size-16 object-contain"
              src={picnicHeaderLogo}
              alt={t('header.logoAltText')}
            />
          </button>
          <Input />
        </div>
        <div className="hidden md:block">
          <NavMenu />
        </div>
      </header>
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center w-full bg-header md:hidden">
        <NavMenu />
      </div>
    </>
  )
}
