import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import { Layout } from './Layout'
import { useAuth } from './store'
import { ProtectedRoute } from './components'
import {
  Cart,
  Home,
  LogIn,
  SignUp,
  Profile,
  Settings,
  ErrorPage,
} from './pages'

const router = createBrowserRouter([
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
])

export const App = () => {
  useAuth()

  return <RouterProvider router={router} />
}
