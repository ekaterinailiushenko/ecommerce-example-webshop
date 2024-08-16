import { Input } from './Input'
import { useSetAtom } from 'jotai'
import { NavMenu } from './NavMenu'
import { Link } from 'react-router-dom'
import picnicHeaderLogo from '../assets/picnicHeaderLogo.png'
import { searchItemAtom } from '../store/searchItemsStore'

export const Header = () => {
  const setValue = useSetAtom(searchItemAtom)

  return (
    <header className="flex h-16 justify-between items-center bg-header">
      <Link to={`/`} onClick={() => setValue('')}>
        <img className="size-16" src={picnicHeaderLogo} alt="Logo" />
      </Link>
      <Input />
      <NavMenu />
    </header>
  )
}
