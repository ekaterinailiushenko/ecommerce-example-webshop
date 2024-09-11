import { Navigate } from 'react-router-dom'

import { useAuthStore } from '../store'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthStore(state => ({
    user: state.user,
    loading: state.loading,
  }))

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
