import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'

export const Layout = () => {
  return (
    <div className="min-h-screen bg-main flex flex-col">
      <Header />
      <main className="flex h-[calc(100vh-64px)] justify-center items-center">
        <Outlet />
      </main>
    </div>
  )
}
