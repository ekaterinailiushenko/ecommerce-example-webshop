export const getRouteErrorMessage = (status: number) => {
  switch (status) {
    case 404:
      return 'routeError.pageNotFound'

    case 401:
      return 'routeError.unauthorized'

    case 503:
      return 'routeError.apiUnavailable'

    default:
      return 'routeError.unknownError'
  }
}
