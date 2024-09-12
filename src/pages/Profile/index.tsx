import { useEffect } from 'react'
import { MdLogout } from 'react-icons/md'
import { BsGearFill } from 'react-icons/bs'
import { Link, Outlet, useLocation } from 'react-router-dom'

import en from '../../i18n/en.json'
import { useCartStore, useAuthStore } from '../../stores'
import defaultAvatar from '../../assets/defaultAvatar.png'

export const Profile = () => {
  const { user, logout } = useAuthStore(state => ({
    user: state.user,
    logout: state.logout,
  }))

  const setUserId = useCartStore(state => state.setUserId)

  const location = useLocation()
  const isProfilePage = ['/profile'].includes(location.pathname)

  useEffect(() => {
    if (user) {
      setUserId(user.uid) // Set the user ID and load the cart
    } else {
      setUserId(null) // Clear user ID on logout
    }
  }, [user, setUserId])

  const handleLogoutClick = async () => {
    await logout()
  }

  return (
    // <div className="flex flex-col h-[calc(100vh-64px)] py-5 px-14">
    <div className="h-[calc(100vh-64px)] py-5 px-14">
      <div className="flex gap-5">
        <div className="relative flex">
          <img
            src={defaultAvatar}
            className="rounded-full w-32"
            alt="Profile"
          />
          {isProfilePage && (
            <Link to={'settings'}>
              <BsGearFill className="text-3xl text-neutral-400 absolute top-1 right-1 hover:animate-spin-slow" />
            </Link>
          )}
        </div>
        <div className="flex flex-col justify-between my-5">
          <h1 className="text-3xl font-semibold">{en.profile.title}</h1>
          <p className="text-slate-600">
            {en.profile.email} {user?.email}
          </p>
          <button
            className="flex items-center gap-2"
            onClick={handleLogoutClick}
          >
            <MdLogout className="text-slate-600" />
            <p className="text-xs text-slate-600">{en.profile.buttons.logout.title}</p>
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
