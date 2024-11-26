import { useState } from 'react'
import classNames from 'classnames'

import { Container } from './Container'

export namespace ImageWithPlaceholder {
  export interface Props {
    src: string
    alt: string

    size?: number
  }
}

export const ImageWithPlaceholder = ({ src, alt, size }: ImageWithPlaceholder.Props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  return (
    <Container className="relative h-full w-full">
      <Container
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
        style={{ height: size }}
        onLoad={handleImageLoad}
      />
    </Container>
  )
}
