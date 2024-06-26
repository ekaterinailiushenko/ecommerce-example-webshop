import { Input } from './components/Input'
import { Link, Outlet } from 'react-router-dom'
import picnicHeaderLogo from './assets/picnicHeaderLogo.png'

export const Layout = () => {
  return (
    <div className="min-h-screen bg-green-100 flex flex-col">
      <header className="flex h-16 justify-between items-center bg-header">
        <Link to={`/`}>
          <img className="size-16" src={picnicHeaderLogo} alt="Logo" />
        </Link>
        <Input />
        <Link className="size-16" to={`/login`}>
          Login
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
