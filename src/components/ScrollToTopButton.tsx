import classNames from 'classnames'
import { useEffect, useState } from 'react'

import { Icon } from '../uikit'

const SCROLL_THRESHOLD = 400

export const ScrollToTopButton = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  const [isScrollingToTop, setIsScrollingToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsButtonVisible(window.scrollY > SCROLL_THRESHOLD)

      if (window.scrollY === 0) {
        setIsScrollingToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    setIsScrollingToTop(true)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={classNames(
        'sm:bottom-28 sm:right-14 sm:p-3 sm:hover:text-green5',
        'fixed bottom-16 right-4 p-2 bg-white shadow-md rounded-xl transition-opacity duration-300 ease-in-out',
        isButtonVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
        isScrollingToTop && 'text-green5 cursor-default'
      )}
    >
      <Icon variant="arrowUp" size="md" />
    </button>
  )
}
