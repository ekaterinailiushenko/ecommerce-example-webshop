import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import '../index.css'
import { Routes } from './config'
import { ProtectedRoute, Layout } from '../uikit'
import { ProfileContextProvider } from '../contexts/ProfileContext/provider'
import { Cart, Home, LogIn, SignUp, Profile, Settings, ErrorPage } from '../pages'

const router = createBrowserRouter(
  [
    {
      path: Routes.HOME_PAGE_URL,
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: Routes.SIGNUP_PAGE_URL,
          element: <SignUp />,
        },
        {
          path: Routes.LOGIN_PAGE_URL,
          element: <LogIn />,
        },
        {
          path: Routes.PROFILE_PAGE_URL,
          element: (
            <ProtectedRoute>
              <ProfileContextProvider>
                <Profile />
              </ProfileContextProvider>
            </ProtectedRoute>
          ),
          children: [
            {
              path: Routes.SETTINGS_PAGE_URL,
              element: <Settings />,
            },
          ],
        },
        {
          path: Routes.CART_PAGE_URL,
          element: <Cart />,
        },
      ],
    },
  ],
  {
    basename: Routes.BASENAME_URL,
  }
)

export const Router = () => {
  return <RouterProvider router={router} />
}