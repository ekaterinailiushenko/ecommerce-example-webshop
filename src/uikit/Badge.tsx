import classNames from 'classnames'

import { Text } from './Text'
import { Icon } from './Icon'
import { Container } from './Container'

export namespace Badge {
  export interface Props {
    variant: keyof typeof variantClasses
    label: string

    /**
     * @default m
     */
    textSize?: Text.Props['size']
    className?: string
  }
}

const variantClasses = {
  cart: 'px-1.5 rounded-full bg-green4 text-white mt-1',
  priceTagGrey:
    'max-w-fit relative flex justify-center items-center px-2.5 py-0.5 rounded bg-grey1 text-black before:absolute before:-left-1 before:w-2.5 before:h-2.5 before:bg-white before:rounded-full after:absolute after:-right-1 after:w-2.5 after:h-2.5 after:bg-white after:rounded-full',
  priceTagblue:
    'max-w-fit relative flex justify-center items-center px-2.5 py-0.5 rounded bg-blue1 text-white before:absolute before:-left-1 before:w-2.5 before:h-2.5 before:bg-white before:rounded-full after:absolute after:-right-1 after:w-2.5 after:h-2.5 after:bg-white after:rounded-full',
  rating: 'bg-white rounded-t-lg flex items-center px-1.5 gap-0.5',
  tooltip: 'bg-grey3 rounded-lg py-1 px-2 text-white shadow-[0px_2px_15px_rgba(0,_0,_0,_0.05)]',
}

export const Badge = ({ variant, label, textSize, className }: Badge.Props) => {
  return (
    <Container className={classNames(variantClasses[variant], className)}>
      {variant === 'rating' && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="-0.5 -0.5 8 8"
            fill="white"
            className="absolute bottom-0.5 -left-2"
          >
            <path d="M8 0L7.04733 3.81069C6.70761 5.16956 5.68185 6.25174 4.3431 6.66366L0 8H8V0Z" />
          </svg>
          <Icon variant="star" size="xxs" className="mt-0.5" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="white"
            className="absolute -bottom-0.5 -right-2 -scale-x-100"
          >
            <path d="M9 0L7.44733 3.81069C6.70761 5.16956 5.68185 6.25174 4.3431 6.66366L0 8H8V0Z"></path>
          </svg>
        </>
      )}
      <Text text={label} size={textSize} className="leading-snug" />
    </Container>
  )
}
