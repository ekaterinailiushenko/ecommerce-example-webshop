import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'

export const Layout = () => {
  return (
    // <div className="min-h-screen bg-main flex flex-col">
    <div className="flex flex-col h-screen">
      <Header />
      {/* <main className="flex h-[calc(100vh-64px)] justify-center items-center bg-blue-200"> */}
      {/* <main className="flex justify-center items-center bg-green-200"> */}
      {/* <main className="bg-main"> */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
