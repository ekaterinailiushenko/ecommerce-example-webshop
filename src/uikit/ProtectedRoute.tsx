import { Navigate } from 'react-router-dom'

import en from '../i18n/en.json'
import { LOGIN_PAGE_URL } from '../helpers/constants'
import { useAuthContext } from '../contexts/AuthContext/hook'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthContext()

  if (loading) {
    return <div>{en.global.loading}</div>
  }

  if (!user) {
    return <Navigate to={LOGIN_PAGE_URL} replace />
  }

  return children
}
