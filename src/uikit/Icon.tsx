import { TfiClose } from 'react-icons/tfi'
import { ImSpinner9 } from 'react-icons/im'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsGearFill, BsCart2 } from 'react-icons/bs'
import { IoChevronBackOutline } from 'react-icons/io5'
import { FaCheck, FaInfoCircle } from 'react-icons/fa'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { MdLogout, MdClear, MdOutlineShoppingCart, MdAccountCircle } from 'react-icons/md'

import { logger } from '../utilities'

interface IconProps {
  variant: keyof typeof iconMap
  className?: string
}

const iconMap = {
  BsCart2,
  FaCheck,
  MdClear,
  TfiClose,
  MdLogout,
  BsGearFill,
  ImSpinner9,
  FaInfoCircle,
  AiOutlinePlus,
  AiOutlineMinus,
  MdAccountCircle,
  RiDeleteBin6Line,
  IoChevronBackOutline,
  MdOutlineShoppingCart,
}

export const Icon = ({ variant, className, ...rest }: IconProps) => {
  const IconComponent = iconMap[variant]

  if (!IconComponent) {
    logger.warn(`Icon component for variant "${variant}" not found.`)
    return null
  }

  return <IconComponent className={className} {...rest} />
}
