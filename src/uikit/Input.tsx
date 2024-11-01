import { MdClear } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import en from '../i18n/en.json'
import { useProductContext } from '../contexts/ProductContext/hook'

export const Input = () => {
  const [searchItem, setSearchItem] = useState('')

  const { filterProducts, isLoading } = useProductContext()

  const location = useLocation()
  const isHomePage = ['/'].includes(location.pathname)

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
        <div className="relative">
          <input
            type="text"
            value={searchItem}
            onChange={e => setSearchItem(e.target.value)}
            placeholder={en.header.inputPlaceholder}
            className="md:w-96 bg-searchbar p-2 pl-4 rounded-3xl shadow-sm placeholder:text-white placeholder:text-sm placeholder:opacity-50 focus:outline-none focus:shadow-outline focus:bg-white"
          />
          {searchItem && (
            <MdClear className="absolute top-3 right-2" onClick={() => setSearchItem('')} />
          )}
        </div>
      )}
    </>
  )
}
