import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Icon } from '../../uikit'
import en from '../../i18n/en.json'
import { logger } from '../../utilities'
import { UpdateImageButton } from './components'
import { useAuthContext } from '../../contexts/AuthContext/hook'
import { useProfileContext } from '../../contexts/ProfileContext/hook'

export const Settings = () => {
  const [newPassword, setNewPassword] = useState('')

  const { user, error, loading, changePassword, deleteUser } = useAuthContext()

  const {
    loading: isLoading,
    error: isError,
    userPhoto,
    updateProfileImage,
    loadProfileImage,
    deleteProfileImage,
  } = useProfileContext()

  const navigate = useNavigate()

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      logger.error('User is undefined')
      return
    }
    await changePassword({ user, newPassword })
  }

  const handleDeleteAccountClick = async () => {
    const confirmed = window.confirm(en.profile.buttons.deleteAccount.warn)

    if (!user) {
      logger.error('User is undefined')
      return
    }

    if (!confirmed) {
      return
    }

    await deleteUser(user)
  }

  const handleUploadImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!user) {
      logger.error('User is undefined')
      return
    }

    if (!file) {
      logger.error('No file selected')
      return
    }

    await updateProfileImage({ file, user })
  }

  const handleDeleteProfileImageClick = async () => {
    const confirmed = window.confirm(en.profile.buttons.changeImage.warn)

    if (!user) {
      logger.error('User is undefined')
      return
    }

    if (!confirmed) {
      return
    }

    await deleteProfileImage(user)
  }

  useEffect(() => {
    if (!user) {
      logger.error('User is undefined')
      return
    }

    void loadProfileImage(user)
  }, [user, loadProfileImage])

  return (
    <>
      <button
        onClick={() => {
          navigate(-1)
        }}
        className="flex items-center gap-2"
      >
        <Icon variant="IoChevronBackOutline" className="text-slate-600" />
        <p className="text-slate-600 text-sm">{en.profile.returnToAccount}</p>
      </button>
      <h1 className="text-3xl font-semibold">{en.profile.settings}</h1>
      <h2 className="text-2xl font-semibold">{en.profile.data}</h2>
      <div className="flex items-center gap-6 outline">
        {isLoading ? (
          <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse" />
        ) : (
          <img
            className="rounded-full w-16 h-16"
            src={userPhoto}
            alt={en.profile.profileImageAltText}
          />
        )}
        <UpdateImageButton onChange={handleUploadImageChange} />
        <button
          onClick={handleDeleteProfileImageClick}
          className={classNames(isError && 'invisible')}
        >
          <Icon variant="RiDeleteBin6Line" />
        </button>
      </div>
      <form onSubmit={handleNewPasswordSubmit} className="bg-yellow-200">
        <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-gray-700">
          {en.profile.buttons.changePassword.title}
        </label>
        <div className="flex space-x-2">
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            className=" w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="shadow-md px-3 font-medium text-white bg-green-600 rounded-md"
            disabled={loading}
          >
            {loading ? en.global.changing : <Icon variant="FaCheck" />}
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        onClick={handleDeleteAccountClick}
        className="shadow-md px-3 py-1 font-medium text-white bg-red-600 rounded-md"
      >
        {en.profile.buttons.deleteAccount.title}
      </button>
    </>
  )
}
