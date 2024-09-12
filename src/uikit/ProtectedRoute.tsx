import { Navigate } from 'react-router-dom'

import en from '../i18n/en.json'
import { useAuthStore } from '../stores'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthStore(state => ({
    user: state.user,
    loading: state.loading,
  }))

  if (loading) {
    return <div>{en.global.loading}</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
