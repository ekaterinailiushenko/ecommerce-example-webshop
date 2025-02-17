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
        'fixed bottom-28 right-14 p-3 bg-white hover:text-green5 shadow-md rounded-xl transition-opacity duration-300 ease-in-out',
        isButtonVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
        isScrollingToTop && 'text-green5 cursor-default'
      )}
    >
      <Icon variant="arrowUp" size="md" />
    </button>
  )
}
