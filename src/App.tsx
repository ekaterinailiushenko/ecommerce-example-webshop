import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import {
  Cart,
  Home,
  LogIn,
  SignUp,
  Profile,
  Settings,
  ErrorPage,
} from './pages'
import './index.css'
import { Layout, ProtectedRoute } from './uikit'
import { CartContextProvider } from './contexts/CartContext/provider'
import { AuthContextProvider } from './contexts/AuthContext/provider'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'signup',
          element: <SignUp />,
        },
        {
          path: 'login',
          element: <LogIn />,
        },
        {
          path: 'profile',
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
          children: [
            {
              path: 'settings',
              element: <Settings />,
            },
          ],
        },
        {
          path: 'cart',
          element: <Cart />,
        },
      ],
    },
  ],
  {
    basename: '/picnic-app',
  },
)

export const App = () => {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AuthContextProvider>
  )
}
