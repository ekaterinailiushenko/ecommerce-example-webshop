import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import {
  BASENAME_URL,
  CART_PAGE_URL,
  HOME_PAGE_URL,
  LOGIN_PAGE_URL,
  PROFILE_PAGE_URL,
  SETTINGS_PAGE_URL,
  SIGNUP_PAGE_URL,
} from './helpers/constants'
import './index.css'
import { Layout, ProtectedRoute } from './uikit'
import { CartContextProvider } from './contexts/CartContext/provider'
import { AuthContextProvider } from './contexts/AuthContext/provider'
import { ProfileContextProvider } from './contexts/ProfileContext/provider'
import { ProductContextProvider } from './contexts/ProductContext/provider'
import { Cart, Home, LogIn, SignUp, Profile, Settings, ErrorPage } from './pages'

const router = createBrowserRouter(
  [
    {
      path: HOME_PAGE_URL,
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: SIGNUP_PAGE_URL,
          element: <SignUp />,
        },
        {
          path: LOGIN_PAGE_URL,
          element: <LogIn />,
        },
        {
          path: PROFILE_PAGE_URL,
          element: (
            <ProtectedRoute>
              <ProfileContextProvider>
                <Profile />
              </ProfileContextProvider>
            </ProtectedRoute>
          ),
          children: [
            {
              path: SETTINGS_PAGE_URL,
              element: <Settings />,
            },
          ],
        },
        {
          path: CART_PAGE_URL,
          element: <Cart />,
        },
      ],
    },
  ],
  {
    basename: BASENAME_URL,
  }
)

export const App = () => {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  )
}
