import classNames from 'classnames'

import { Text } from './Text'
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
  tooltip: 'bg-grey3 rounded-lg py-1 px-2 text-white shadow-[0px_2px_15px_rgba(0,_0,_0,_0.05)]',
}

export const Badge = ({ variant, label, textSize = 'm', className }: Badge.Props) => {
  return (
    <Container className={classNames(variantClasses[variant], className)}>
      <Text text={label} size={textSize} className="leading-snug" />
    </Container>
  )
}
