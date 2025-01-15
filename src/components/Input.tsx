import { useMatch } from 'react-router'
import { useEffect, useState } from 'react'

import en from '../i18n/en.json'
import { Button } from '../uikit'
import { Routes } from '../router/config'
import { useProductContext } from '../contexts/ProductContext/hook'

export const Input = () => {
  const [searchItem, setSearchItem] = useState('')

  const { filterProducts, isLoading } = useProductContext()

  const isHomePage = !!useMatch(Routes.HOME_PAGE_URL)

  useEffect(() => {
    if (!isHomePage) {
      setSearchItem('')
    }
  }, [isHomePage])

  useEffect(() => {
    void filterProducts(searchItem)
  }, [searchItem, filterProducts])

  return (
    <>
      {!isLoading && isHomePage && (
        <div className="relative w-full">
          <input
            type="text"
            value={searchItem}
            onChange={e => setSearchItem(e.target.value)}
            maxLength={50}
            placeholder={en.header.inputPlaceholder}
            className="w-full bg-searchbar py-2 pl-6 pr-8 rounded-3xl shadow-sm placeholder:text-white placeholder:text-sm placeholder:opacity-50 focus:outline-none focus:shadow-outline focus:bg-white"
          />
          {searchItem && (
            <Button
              variant="icon"
              icon="cross"
              onClick={() => setSearchItem('')}
              className="absolute inset-y-0 right-3"
            />
          )}
        </div>
      )}
    </>
  )
}
