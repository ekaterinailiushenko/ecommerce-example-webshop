import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { logger } from '../utilities'
import { type SupportedLanguage, SupportedLanguages } from '../i18n/config'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  return (
    <div className="relative inline-block text-left">
      <Menu>
        <MenuButton className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          {i18n.language}
          <ChevronDownIcon className="w-5 h-5 ml-2" aria-hidden="true" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 mt-1 p-1 w-40 space-y-1 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {SupportedLanguages.filter(lang => lang !== i18n.language).map(lang => (
            <MenuItem key={lang}>
              <button
                onClick={async () => {
                  try {
                    await i18n.changeLanguage<SupportedLanguage>(lang)
                  } catch (error) {
                    logger.error('Error changing language:', error)
                  }
                }}
                className="rounded-lg data-[focus]:bg-gray-100 data-[focus]:text-gray-900 text-gray-700 block w-full text-left px-4 py-2 text-sm"
              >
                {lang}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}
