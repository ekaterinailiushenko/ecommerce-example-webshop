import { Outlet } from 'react-router'

import { Header } from './Header'
import { Footer } from './Footer'
import { Modal } from '../uikit/Modal'

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <Outlet />
        <Modal />
      </main>
      <Footer />
    </div>
  )
}
