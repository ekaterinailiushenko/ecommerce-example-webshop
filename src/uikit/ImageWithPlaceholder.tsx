// ImageWithPlaceholder component
import { useState } from 'react'
import classNames from 'classnames'

export const ImageWithPlaceholder = ({
  src,
  alt,
  size,
}: {
  src: string
  alt: string
  size: number
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div className="relative h-full w-full">
      <div
        className={classNames(
          'absolute inset-0 bg-slate-200 transition-opacity duration-500',
          isLoaded ? 'opacity-0' : 'opacity-100 animate-pulse'
        )}
      />
      <img
        src={src}
        alt={alt}
        className={classNames(
          'transition-opacity duration-500 object-contain mx-auto',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        style={{ height: `${size}px` }}
        onLoad={handleImageLoad}
      />
    </div>
  )
}
