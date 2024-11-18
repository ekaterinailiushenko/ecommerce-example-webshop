import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'

import { Icon } from './Icon'
import en from '../i18n/en.json'
import { Routes } from '../router/config'
import { useProductContext } from '../contexts/ProductContext/hook'

export const Input = () => {
  const [searchItem, setSearchItem] = useState('')

  const { filterProducts, isLoading } = useProductContext()

  const HomePage = useMatch(Routes.HOME_PAGE_URL)

  useEffect(() => {
    if (!HomePage) {
      setSearchItem('')
    }
  }, [HomePage])

  useEffect(() => {
    void filterProducts(searchItem)
  }, [searchItem, filterProducts])

  return (
    <>
      {!isLoading && HomePage && (
        <div className="relative">
          <input
            type="text"
            value={searchItem}
            onChange={e => setSearchItem(e.target.value)}
            maxLength={50}
            placeholder={en.header.inputPlaceholder}
            className="md:w-96 bg-searchbar py-2 pl-6 pr-8 rounded-3xl shadow-sm placeholder:text-white placeholder:text-sm placeholder:opacity-50 focus:outline-none focus:shadow-outline focus:bg-white"
          />
          {searchItem && (
            <button onClick={() => setSearchItem('')} className="absolute inset-y-0 right-3">
              <Icon variant="cross" />
            </button>
          )}
        </div>
      )}
    </>
  )
}
