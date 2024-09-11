import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

import en from '../../i18n/en.json'
import { logger } from '../../utilities'

export const ErrorPage = () => {
  const error = useRouteError()

  logger.error(error)

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{en.global.errorHeader}</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        <p>{error.data}</p>
      </div>
    )
  }
}
