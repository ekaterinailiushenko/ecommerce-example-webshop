import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { logger } from '../utilities/logger'

export const ErrorPage = () => {
  const error = useRouteError()

  logger.error(error)

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        <p>{error.data}</p>
      </div>
    )
  }
}
