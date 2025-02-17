import { Outlet } from 'react-router'

import { Header } from './Header'
import { Footer } from './Footer'
import { Modal } from '../uikit/Modal'
import { ScrollToTopButton } from './ScrollToTopButton'

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <Outlet />
        <Modal />
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}
