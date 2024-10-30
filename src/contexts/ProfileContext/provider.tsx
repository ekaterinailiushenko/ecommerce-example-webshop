import {
  type User,
  deleteUser,
  updateProfile,
  updatePassword,
} from 'firebase/auth'
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from 'firebase/storage'
import { FirebaseError } from 'firebase/app'
import { useCallback, useMemo, useState, type ReactNode } from 'react'

import en from '../../i18n/en.json'
import { ProfileContext } from './context'
import { storage } from '../../firebaseConfig'
import defaultAvatar from '../../assets/defaultAvatar.png'
import { getFirebaseErrorMessage, logger } from '../../utilities'

export const ProfileContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [error, setError] = useState<string | null>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userPhoto, setUserPhoto] = useState(defaultAvatar)

  const handleDeleteUser = useCallback(async (user: User) => {
    setError(null)

    try {
      await deleteUser(user)
    } catch (error) {
      logger.error('Failed to delete user', JSON.stringify(error))

      const errorMessage =
        error instanceof FirebaseError
          ? getFirebaseErrorMessage(error.code)
          : en.profile.errors.deleteUser

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleChangePassword = useCallback(
    async (user: User, newPassword: string) => {
      setError(null)

      try {
        await updatePassword(user, newPassword)
      } catch (error) {
        logger.error('Failed to change user password', JSON.stringify(error))

        const errorMessage =
          error instanceof FirebaseError
            ? getFirebaseErrorMessage(error.code)
            : en.profile.errors.changePassword

        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const handleDeleteUserPhoto = useCallback(async (user: User) => {
    setError(null)

    try {
      const fileRef = ref(
        storage,
        `profilePics/${user?.uid}/profilePicture.png`,
      )

      await deleteObject(fileRef)

      setUserPhoto(defaultAvatar)
    } catch (error) {
      logger.error('Failed to delete user photo', JSON.stringify(error))

      const errorMessage =
        error instanceof FirebaseError
          ? getFirebaseErrorMessage(error.code)
          : en.profile.errors.deleteUserPhoto

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleLoadProfileImage = useCallback(async (user: User) => {
    setError(null)

    try {
      const fileRef = ref(
        storage,
        `profilePics/${user?.uid}/profilePicture.png`,
      )

      const photoURL = await getDownloadURL(fileRef)

      setUserPhoto(photoURL)
    } catch (error) {
      logger.error('Failed to load profile image', JSON.stringify(error))

      const errorMessage =
        error instanceof FirebaseError
          ? getFirebaseErrorMessage(error.code)
          : en.profile.errors.loadUserPhoto

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleUpdateProfilePhoto = useCallback(
    async (file: File, user: User) => {
      setError(null)

      try {
        const fileRef = ref(
          storage,
          `profilePics/${user?.uid}/profilePicture.png`,
        )

        await uploadBytes(fileRef, file)

        const photoURL = await getDownloadURL(fileRef)

        await updateProfile(user, { photoURL })

        setUserPhoto(photoURL)
      } catch (error) {
        logger.error('Failed to update profile image', JSON.stringify(error))

        const errorMessage =
          error instanceof FirebaseError
            ? getFirebaseErrorMessage(error.code)
            : en.profile.errors.updateUserPhoto

        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const value = useMemo(() => {
    const obj: ProfileContext.Value = {
      error,
      userPhoto,
      loading: isLoading,
      deleteUser: handleDeleteUser,
      changePassword: handleChangePassword,
      deleteUserPhoto: handleDeleteUserPhoto,
      loadProfileImage: handleLoadProfileImage,
      updateProfilePhoto: handleUpdateProfilePhoto,
    }
    return obj
  }, [
    error,
    userPhoto,
    isLoading,
    handleDeleteUser,
    handleChangePassword,
    handleDeleteUserPhoto,
    handleLoadProfileImage,
    handleUpdateProfilePhoto,
  ])

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}
