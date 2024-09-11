import { useEffect } from 'react'
import { MdClear } from 'react-icons/md'
import { useLocation } from 'react-router-dom'

import { useProductsStore } from '../store'

export const Input = () => {
  const { filterItems, searchItem, setSearchItem, isLoading } =
    useProductsStore(state => {
      return {
        filterItems: state.filterProducts,
        searchItem: state.searchItem,
        setSearchItem: state.setSearchItem,
        isLoading: state.isLoading,
      }
    })

  const location = useLocation()
  const isHomePage = ['/'].includes(location.pathname)

  useEffect(() => {
    if (!isHomePage) {
      setSearchItem('')
    }
  }, [isHomePage, setSearchItem])

  useEffect(() => {
    filterItems(searchItem)
  }, [searchItem, filterItems])

  return (
    <>
      {!isLoading && isHomePage && (
        <div className="relative">
          <input
            type="text"
            value={searchItem}
            onChange={e => setSearchItem(e.target.value)}
            placeholder="Search by name..."
            className="md:w-96 bg-searchbar p-2 pl-4 rounded-3xl shadow-sm placeholder:text-white placeholder:text-sm placeholder:opacity-50 focus:outline-none focus:shadow-outline focus:bg-white"
          />
          {searchItem && (
            <MdClear
              className="absolute top-3 right-2"
              onClick={() => setSearchItem('')}
            />
          )}
        </div>
      )}
    </>
  )
}
