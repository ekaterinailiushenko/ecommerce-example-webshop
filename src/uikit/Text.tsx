import classNames from 'classnames'

export namespace Text {
  export interface Props {
    text: string

    /**
     * @default m
     */
    size?: 'xs' | 's' | 'm' | 'l' | 'xl'
    className?: string
  }
}

const sizeClasses = {
  xs: 'text-xs',
  s: 'text-sm',
  m: 'text-base',
  l: 'text-lg',
  xl: 'text-xl',
}

export const Text = ({ text, size = 'm', className, ...rest }: Text.Props) => {
  const combinedClassName = classNames(sizeClasses[size], className)

  return (
    <p className={combinedClassName} {...rest}>
      {text}
    </p>
  )
}
