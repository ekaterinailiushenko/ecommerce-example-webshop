import type { User } from 'firebase/auth'
import { FaCheck } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoChevronBackOutline } from 'react-icons/io5'

import { logger } from '../../utilities'
import { UpdateImageButton } from '../../uikit'
import { useAuthStore, useProfileStore } from '../../stores'

export const Settings = () => {
  const [newPassword, setNewPassword] = useState('')

  const { user, error, loading, changePassword, deleteUser } = useAuthStore(
    state => ({
      user: state.user,
      error: state.error,
      loading: state.loading,
      changePassword: state.changePassword,
      deleteUser: state.deleteUser,
    })
  )

  const {
    isProfileLoading,
    isProfileError,
    userPhoto,
    updateProfilePhoto,
    loadProfileImage,
    deleteUserPhoto,
  } = useProfileStore(state => ({
    isProfileLoading: state.loading,
    isProfileError: state.error,
    userPhoto: state.userPhoto,
    updateProfilePhoto: state.updateProfilePhoto,
    loadProfileImage: state.loadProfileImage,
    deleteUserPhoto: state.deleteUserPhoto,
  }))

  const navigate = useNavigate()

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      logger.error('User is not authenticated')
      return
    }
    await changePassword(user, newPassword)
  }

  const handleDeleteAccountClick = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account?'
    )
    if (confirmed) {
      await deleteUser(user as User)
    }
  }

  const handleUploadImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && user) {
      updateProfilePhoto(file, user)
    } else {
      logger.error('No file selected')
    }
  }

  const handleDeleteProfileImageClick = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your profile image?'
    )
    if (confirmed) {
      await deleteUserPhoto(user as User)
    }
  }

  useEffect(() => {
    void loadProfileImage(user as User)
  }, [user, loadProfileImage])

  return (
    <>
      <button
        onClick={() => {
          navigate(-1)
        }}
        className="flex items-center gap-2"
      >
        <IoChevronBackOutline className="text-slate-600" />
        <p className="text-slate-600 text-sm">
          Return to your personal account
        </p>
      </button>
      <h1 className="text-3xl font-semibold">My settings</h1>
      <h2 className="text-2xl font-semibold">Personal data</h2>
      <div className="flex items-center gap-6 outline">
        {isProfileLoading ? (
          <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse" />
        ) : (
          <img className="rounded-full w-16 h-16" src={userPhoto} alt="User" />
        )}
        <UpdateImageButton onChange={handleUploadImageChange} />
        <button
          onClick={handleDeleteProfileImageClick}
          className={isProfileError ? 'invisible' : ''}
        >
          <RiDeleteBin6Line />
        </button>
      </div>
      <form onSubmit={handleNewPasswordSubmit} className="bg-yellow-200">
        <label
          htmlFor="newPassword"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Change password
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
            {loading ? 'Changing...' : <FaCheck />}
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        onClick={handleDeleteAccountClick}
        className="shadow-md px-3 py-1 font-medium text-white bg-red-600 rounded-md"
      >
        Delete account
      </button>
    </>
  )
}
