import classNames from 'classnames'
import type { ButtonHTMLAttributes } from 'react'

import { Icon } from './Icon'

export namespace Button {
  export interface Props {
    variant: keyof typeof variantClasses

    label?: string
    children?: Children
    isLoading?: boolean
    className?: string
    disabled?: boolean
    onClick?: () => void
    /**
     * @default minimal
     */
    size?: keyof typeof sizeClasses
    icon?: Icon.Props['variant']
    /**
     * @default sm
     */
    iconSize?: Icon.Props['size']
    /**
     * @default left
     */
    iconPosition?: 'left' | 'right'
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  }
}

const variantClasses = {
  success:
    'bg-green1 hover:bg-green2 text-white flex items-center justify-center gap-2 font-medium rounded-lg transition-colors',
  secondary:
    'flex items-center justify-center bg-green7 text-green1 hover:bg-green2 hover:text-white rounded-lg gap-1.5 text-sm font-medium transition-colors duration-200 ease-in-out',
  danger:
    'bg-berry1 hover:bg-berry2 text-white flex items-center justify-center gap-2 font-medium rounded-lg transition-colors',
  info: 'bg-white opacity-90 shadow-md text-sm hover:text-green3 flex items-center justify-center gap-2 font-medium rounded-lg transition-colors',
  light:
    'bg-grey1 hover:text-green1 flex items-center justify-center gap-2 font-medium rounded-lg transition-colors',
  minimalist: 'flex items-center gap-1 text-grey2 hover:text-green-500 text-sm',
  icon: '',
  circle: 'bg-grey3 rounded-full size-fit p-px',
}

const sizeClasses = {
  minimal: '',
  small: 'py-2.5 px-4',
  regular: 'py-2.5 px-10',
  large: 'py-2.5 w-full',
}

export const Button = ({
  label,
  children,
  isLoading,
  className,
  onClick,
  variant,
  size = 'minimal',
  icon,
  iconSize,
  iconPosition = 'left',
  disabled,
  ...rest
}: Button.Props) => {
  const combinedClassName = classNames(sizeClasses[size], variantClasses[variant], className)

  const renderIcon = (position: Button.Props['iconPosition']) => {
    if (!icon || iconPosition !== position) {
      return null
    }

    return <Icon variant={icon} size={iconSize} />
  }

  const renderContent = () => {
    if (isLoading) {
      return <Icon variant="spinner" size={iconSize} />
    }

    if (!label) {
      return children
    }

    return label
  }

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {renderIcon('left')}
      {renderContent()}
      {renderIcon('right')}
    </button>
  )
}
