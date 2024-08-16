import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useProductsStore } from '../store/useProductsStore'
import { MdClear } from 'react-icons/md'
import { searchItemAtom } from '../store/searchItemsStore'

export const Input = () => {
  const [value, setValue] = useAtom(searchItemAtom)

  const location = useLocation()
  const isHomePage = ['/'].includes(location.pathname)

  const { filterItems, isLoading } = useProductsStore(state => {
    return {
      filterItems: state.filterProducts,
      isLoading: state.isLoading,
    }
  })
  console.log('Search Input render')

  useEffect(() => {
    if (!isHomePage) {
      setValue('')
    }
  }, [isHomePage])

  useEffect(() => {
    filterItems(value)
  }, [value, filterItems])

  return (
    <>
      {!isLoading && isHomePage && (
        <div className="relative">
          <input
            type="text"
            // ref={inputRef}
            value={value}
            // onChange={() => filterItems(inputRef.current.value)}
            onChange={e => setValue(e.target.value)}
            placeholder="Search by name..."
            className="md:w-96 bg-searchbar p-2 pl-4 rounded-3xl shadow-sm placeholder:text-white placeholder:text-sm placeholder:opacity-50 focus:outline-none focus:shadow-outline focus:bg-white"
          />
          {value && (
            <MdClear
              className="absolute top-3 right-2"
              onClick={() => setValue('')}
            />
          )}
        </div>
      )}
    </>
  )
}
