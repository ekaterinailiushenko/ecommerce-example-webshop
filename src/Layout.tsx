import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'

export const Layout = () => {
  return (
    <div className="min-h-screen bg-main flex flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
