import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

import { Container } from '../../uikit'
import { logger } from '../../utilities'
import { getRouteErrorMessage } from '../../router/getRouterErrorMessage'

export const RouteErrorPage = () => {
  const { t } = useTranslation()

  const error = useRouteError()

  useEffect(() => {
    if (error) {
      logger.error(error)
    }
  }, [error])

  const isRouteError = isRouteErrorResponse(error)

  const errorMessage = isRouteError
    ? t(getRouteErrorMessage(error.status))
    : t('global.unknownError')

  return (
    <Container className="flex flex-col items-center justify-center h-screen text-center gap-8 bg-white">
      <h1 className="text-4xl font-semibold text-gray-800">{t('global.errorHeader')}</h1>
      <h2 className="text-lg text-gray-600">{errorMessage}</h2>
      <p className="text-sm text-gray-500 italic">{isRouteError && error.statusText}</p>
      <Link to="/" className="text-green-600 hover:underline">
        {t('global.backHomeButton')}
      </Link>
    </Container>
  )
}
