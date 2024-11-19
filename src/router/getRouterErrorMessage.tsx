import en from '../i18n/en.json'

export const getRouteErrorMessage = (status: number) => {
  switch (status) {
    case 404:
      return en.routeError.pageNotFound

    case 401:
      return en.routeError.unauthorized

    case 503:
      return en.routeError.apiUnavailable

    default:
      return en.routeError.unknownError
  }
}
