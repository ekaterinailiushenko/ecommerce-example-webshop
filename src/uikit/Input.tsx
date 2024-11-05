import { MdClear } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'

import en from '../i18n/en.json'
import { HOME_PAGE_URL } from '../helpers/constants'
import { useProductContext } from '../contexts/ProductContext/hook'

export const Input = () => {
  const [searchItem, setSearchItem] = useState('')

  const { filterProducts, isLoading } = useProductContext()

  const HomePage = useMatch(HOME_PAGE_URL)

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
            <MdClear className="absolute top-3 right-2" onClick={() => setSearchItem('')} />
          )}
        </div>
      )}
    </>
  )
}
