import classNames from 'classnames'
import { FaCheck } from 'react-icons/fa'
import { TfiClose } from 'react-icons/tfi'
import { BsGearFill } from 'react-icons/bs'
import { ImSpinner9 } from 'react-icons/im'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoChevronBackOutline } from 'react-icons/io5'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { MdLogout, MdOutlineShoppingCart, MdAccountCircle } from 'react-icons/md'

interface IconProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant: keyof typeof iconMap
}

const iconMap = {
  cross: TfiClose,
  logout: MdLogout,
  gear: BsGearFill,
  checkMark: FaCheck,
  plus: AiOutlinePlus,
  spinner: ImSpinner9,
  bin: RiDeleteBin6Line,
  minus: AiOutlineMinus,
  profile: MdAccountCircle,
  cart: MdOutlineShoppingCart,
  chevronLeft: IoChevronBackOutline,
}

const stylePresets: Record<keyof typeof iconMap, string> = {
  bin: '',
  plus: '',
  minus: '',
  cart: 'text-white',
  profile: 'text-white',
  spinner: 'animate-spin',
  checkMark: 'text-white',
  logout: 'text-slate-600',
  chevronLeft: 'text-slate-600',
  gear: 'text-neutral-400 hover:animate-spin-slow',
  cross: 'text-slate-400 hover:text-slate-500 transition',
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export const Icon = ({ variant, size = 'sm', className, ...rest }: IconProps) => {
  const IconComponent = iconMap[variant]

  const combinedClassName = classNames(sizeClasses[size], stylePresets[variant], className)

  return <IconComponent className={combinedClassName} {...rest} />
}
