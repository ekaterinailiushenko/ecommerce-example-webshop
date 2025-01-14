import { Navigate } from 'react-router'

import en from '../i18n/en.json'
import { Routes } from './config'
import { useAuthContext } from '../contexts/AuthContext/hook'

export const ProtectedRoute = ({ children }: { children: Children }) => {
  const { user, loading } = useAuthContext()

  if (loading) {
    return <div>{en.global.loading}</div>
  }

  if (!user) {
    return <Navigate to={Routes.LOGIN_PAGE_URL} replace />
  }

  return children
}
