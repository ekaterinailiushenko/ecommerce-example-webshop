import classNames from 'classnames'
import { useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Icon } from '../uikit'
import { Routes } from '../router/config'
import { SearchInputTypewriter } from './SearchInputTypewriter'
import { useProductContext } from '../contexts/ProductContext/hook'

export const SearchInput = () => {
  const [searchItem, setSearchItem] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [placeholderText, setPlaceholderText] = useState('')

  const { t } = useTranslation()

  const { filterProducts, isLoading } = useProductContext()

  const location = useLocation()

  const isHomePage = location.pathname === Routes.HOME_PAGE_URL

  useEffect(() => {
    if (!isHomePage) {
      setSearchItem('')
    }
  }, [isHomePage])

  useEffect(() => {
    void filterProducts(searchItem)
  }, [searchItem, filterProducts])

  if (isLoading) {
    return <Icon variant="spinner" />
  }

  return (
    <div
      className={classNames(
        !isHomePage && 'invisible',
        'relative w-full rounded-lg border-green4 bg-green4 border-r-50 h-10 outline outline-2 outline-green4'
      )}
    >
      <input
        type="text"
        value={searchItem}
        onChange={e => setSearchItem(e.target.value)}
        maxLength={50}
        placeholder={isFocused ? t('header.inputPlaceholder') : placeholderText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="h-full w-full rounded-lg px-4 focus:outline-none placeholder:text-grey4"
      />
      <SearchInputTypewriter setPlaceholderText={setPlaceholderText} />
      {searchItem && (
        <Button
          variant="circle"
          icon="cross"
          onClick={() => setSearchItem('')}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        />
      )}
    </div>
  )
}
