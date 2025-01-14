import classNames from 'classnames'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

import en from '../../i18n/en.json'
import { Button } from '../../uikit'
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
      <Button
        variant="minimalist"
        icon="chevronLeft"
        label={en.profile.returnToAccount}
        onClick={() => {
          void navigate(-1)
        }}
        className="mt-4"
      />
      <h1 className="text-3xl font-semibold my-4">{en.profile.settings}</h1>
      <h2 className="text-2xl font-semibold">{en.profile.data}</h2>
      <div className="flex items-center gap-6 my-2">
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
        <Button
          variant="icon"
          size="minimal"
          icon="bin"
          iconSize="md"
          onClick={handleDeleteProfileImageClick}
          className={classNames(isError && 'invisible')}
        />
      </div>
      <form onSubmit={handleNewPasswordSubmit} className="my-4">
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
          <Button
            type="submit"
            variant="success"
            size="small"
            icon="checkMark"
            disabled={loading}
          />
        </div>
      </form>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button
        variant="danger"
        size="small"
        label={en.profile.buttons.deleteAccount.title}
        onClick={handleDeleteAccountClick}
      />
    </>
  )
}
