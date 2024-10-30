import { Navigate } from 'react-router-dom'

import en from '../i18n/en.json'
import { useAuthContext } from '../contexts/AuthContext/hook'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthContext()

  if (loading) {
    return <div>{en.global.loading}</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
