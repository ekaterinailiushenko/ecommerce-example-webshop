import classNames from 'classnames'

export namespace Text {
  export interface Props {
    text: string

    /**
     * @default m
     */
    size?: keyof typeof sizeClasses
    className?: string
  }
}

const sizeClasses = {
  xxs: 'text-xxs',
  xs: 'text-xs',
  s: 'text-sm',
  m: 'text-base',
  l: 'text-lg',
  xl: 'text-xl',
  xxl: 'text-2xl',
}

export const Text = ({ text, size = 'm', className, ...rest }: Text.Props) => {
  const combinedClassName = classNames(sizeClasses[size], className)

  return (
    <p className={combinedClassName} {...rest}>
      {text}
    </p>
  )
}
