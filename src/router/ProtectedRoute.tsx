import { Navigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Routes } from './config'
import { useAuthContext } from '../contexts/AuthContext/hook'

export const ProtectedRoute = ({ children }: { children: Children }) => {
  const { t } = useTranslation()

  const { user, loading } = useAuthContext()

  if (loading) {
    return <div>{t('global.loading')}</div>
  }

  if (!user) {
    return <Navigate to={Routes.LOGIN_PAGE_URL} replace />
  }

  return children
}
