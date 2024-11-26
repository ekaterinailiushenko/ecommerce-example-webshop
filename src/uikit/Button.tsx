import classNames from 'classnames'
import type { ButtonHTMLAttributes } from 'react'

import { Icon } from './Icon'

export namespace Button {
  export interface Props {
    variant: 'success' | 'secondary' | 'danger' | 'info' | 'light' | 'minimalist' | 'icon'

    label?: string
    children?: Children
    isLoading?: boolean
    className?: string
    disabled?: boolean
    onClick?: () => void
    /**
     * @default small
     */
    size?: 'minimal' | 'small' | 'regular' | 'large'
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
    'bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 font-medium rounded-lg transition-colors',
  danger:
    'bg-berry1 hover:bg-berry2 text-white flex items-center justify-center gap-2 font-medium rounded-lg transition-colors',
  info: 'bg-white opacity-80 text-sm flex items-center justify-center gap-2 font-medium rounded-lg transition-colors',
  light:
    'bg-grey1 hover:text-green1 flex items-center justify-center gap-2 font-medium rounded-lg transition-colors',
  minimalist: 'flex items-center gap-2 text-slate-600 hover:text-green-500 text-sm',
  icon: '',
}

const sizeClasses = {
  minimal: '',
  small: 'p-2 px-5',
  regular: 'py-2 px-10',
  large: 'py-2 w-full',
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

  const renderIcon = (position: 'left' | 'right') =>
    icon && iconPosition === position && <Icon variant={icon} size={iconSize} />

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {renderIcon('left')}
      {isLoading ? <Icon variant="spinner" size={iconSize} /> : label || children}
      {renderIcon('right')}
    </button>
  )
}
