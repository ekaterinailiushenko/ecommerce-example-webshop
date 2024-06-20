import { Link, Outlet } from 'react-router-dom'
import { Input } from './components/Input'
import logo from './assets/logo.png'
import { useProductsStore } from './store/useProductsStore'

export const Layout = () => {
  const { filterItems } = useProductsStore(state => {
    return {
      filterItems: state.filterProducts,
    }
  })
  console.log('Layout')

  return (
    <div className="min-h-screen bg-main">
      <header className="flex h-16 justify-between items-center bg-header">
        <Link to={`/`}>
          <img className="size-16" src={logo} alt="Logo" />
        </Link>
        <Input onChangeCallback={filterItems} />
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
