import { Routes } from '../router/config'

export const redirectToHomepage = () => {
  window.location.replace(Routes.HOME_PAGE_URL)
}
