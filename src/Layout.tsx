import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'

export const Layout = () => {
  return (
    <div className="min-h-screen bg-main flex flex-col">
      <Header />
      {/* <main className="h-[calc(100vh-64px)] flex items-center justify-center"> */}
      <main className="flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  )
}
