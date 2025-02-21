import {
  MdLogout,
  MdPercent,
  MdMenuBook,
  MdOutlineInfo,
  MdOutlineShoppingCart,
  MdOutlineBusinessCenter,
} from 'react-icons/md'
import classNames from 'classnames'
import { FiPlus } from 'react-icons/fi'
import { FaCheck } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { BiLogoAws } from 'react-icons/bi'
import { ImSpinner9 } from 'react-icons/im'
import { LuCroissant } from 'react-icons/lu'
import { PiMagnifyingGlassBold } from 'react-icons/pi'
import { BsGearFill, BsArrowUp } from 'react-icons/bs'
import { AiOutlineMinus, AiFillStar } from 'react-icons/ai'
import { RiDeleteBin6Line, RiBowlLine } from 'react-icons/ri'
import { IoChevronBackOutline, IoClose } from 'react-icons/io5'
import { TiBusinessCard, TiArrowSortedDown } from 'react-icons/ti'

export namespace Icon {
  export interface Props {
    variant: keyof typeof iconMap

    className?: string
    /**
     * @default sm
     */
    size?: keyof typeof sizeClasses
  }
}

const iconMap = {
  plus: FiPlus,
  cross: IoClose,
  logo: BiLogoAws,
  arrowUp: BsArrowUp,
  logout: MdLogout,
  star: AiFillStar,
  bowl: RiBowlLine,
  gear: BsGearFill,
  menu: MdMenuBook,
  percent: MdPercent,
  profile: CgProfile,
  checkMark: FaCheck,
  info: MdOutlineInfo,
  spinner: ImSpinner9,
  bin: RiDeleteBin6Line,
  croissant: LuCroissant,
  minus: AiOutlineMinus,
  memberCard: TiBusinessCard,
  cart: MdOutlineShoppingCart,
  arrowDown: TiArrowSortedDown,
  mgnfGlass: PiMagnifyingGlassBold,
  suitcase: MdOutlineBusinessCenter,
  chevronLeft: IoChevronBackOutline,
}

const stylePresets: Record<keyof typeof iconMap, string> = {
  bin: '',
  plus: '',
  info: '',
  arrowUp: '',
  arrowDown: '',
  menu: '',
  logo: 'text-green4',
  star: 'fill-orange1',
  minus: '',
  cart: '',
  profile: '',
  bowl: '',
  suitcase: '',
  mgnfGlass: 'text-white',
  croissant: '',
  spinner: 'animate-spin',
  checkMark: 'text-white',
  logout: '',
  memberCard: '',
  chevronLeft: '',
  percent: 'fill-orange2',
  gear: 'text-grey3 animate-spin-slow hover:[animation-play-state:running] [animation-play-state:paused]',
  cross: 'text-grey3 hover:text-grey5 transition',
}

const sizeClasses = {
  xxs: 'w-3.5 h-3.5',
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export const Icon = ({ variant, size = 'sm', className, ...rest }: Icon.Props) => {
  const IconComponent = iconMap[variant]

  const combinedClassName = classNames(sizeClasses[size], stylePresets[variant], className)

  return <IconComponent className={combinedClassName} {...rest} />
}
