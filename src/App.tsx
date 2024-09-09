import './index.css'
import { Layout } from './Layout'
import { Cart } from './pages/Cart'
import { Home } from './pages/Home'
import { LogIn } from './pages/LogIn'
import { SignUp } from './pages/SignUp'
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings'
import { ErrorPage } from './pages/ErrorPage'
import { useAuth } from './store/useAuthStore'
import { ProtectedRoute } from './components/ProtectedRoute'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

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

