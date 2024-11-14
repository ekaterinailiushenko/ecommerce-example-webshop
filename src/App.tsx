import './index.css'
import { Router } from './router'
import { CartContextProvider } from './contexts/CartContext/provider'
import { AuthContextProvider } from './contexts/AuthContext/provider'
import { ModalContextProvider } from './contexts/ModalContext/provider'
import { ProductContextProvider } from './contexts/ProductContext/provider'

export const App = () => {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <ModalContextProvider>
            <Router />
          </ModalContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  )
}
