import { Link, Outlet, useLocation } from 'react-router'

import en from '../../i18n/en.json'
import { Icon, Button } from '../../uikit'
import { Routes } from '../../router/config'
import defaultAvatar from '../../assets/defaultAvatar.png'
import { useAuthContext } from '../../contexts/AuthContext/hook'

export const Profile = () => {
  const { user, logout } = useAuthContext()

  const location = useLocation()

  const handleLogoutClick = async () => {
    await logout()
  }

  return (
    <div className="py-5 px-14">
      <div className="flex gap-5">
        <div className="relative flex">
          <img
            src={defaultAvatar}
            className="rounded-full w-32"
            alt={en.profile.profileImageAltText}
          />
          {location.pathname === Routes.PROFILE_PAGE_URL && (
            <Link to={Routes.SETTINGS_PAGE_URL} className="absolute top-1 right-1">
              <Icon variant="gear" size="lg" />
            </Link>
          )}
        </div>
        <div className="flex flex-col justify-between my-5 items-start">
          <h1 className="text-3xl font-semibold">{en.profile.title}</h1>
          <p className="text-slate-600">
            {en.profile.email} {user?.email}
          </p>
          <Button
            variant="minimalist"
            icon="logout"
            label={en.profile.buttons.logout.title}
            onClick={handleLogoutClick}
          />
        </div>
      </div>
      <Outlet />
    </div>
  )
}
