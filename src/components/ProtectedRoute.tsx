import { useAtomValue } from 'jotai'
import { Navigate } from 'react-router-dom'
import { loadingAtom, userAtom } from '../store/authStore'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAtomValue(userAtom)
  const loading = useAtomValue(loadingAtom)

  console.log('User in ProtectedRoute:', user)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
