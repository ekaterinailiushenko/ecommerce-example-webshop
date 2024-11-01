import { FirebaseError } from 'firebase/app'
import { type User, updateProfile } from 'firebase/auth'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage'

import en from '../../i18n/en.json'
import { ProfileContext } from './context'
import { storage } from '../../firebaseConfig'
import defaultAvatar from '../../assets/defaultAvatar.png'
import { getFirebaseErrorMessage, logger } from '../../utilities'

export const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState(defaultAvatar)

  const handleDeleteProfileImage = useCallback(async (user: User) => {
    setError('')
    setIsLoading(true)

    try {
      if (!user) {
        throw new Error('User is undefined')
      }

      const fileRef = ref(storage, `profilePics/${user.uid}/profilePicture.png`)

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
    setError('')
    setIsLoading(true)

    try {
      if (!user) {
        throw new Error('User is undefined')
      }

      const fileRef = ref(storage, `profilePics/${user.uid}/profilePicture.png`)

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

  const handleUpdateProfileImage = useCallback(
    async ({ file, user }: { file: File; user: User }) => {
      setError('')
      setIsLoading(true)

      try {
        if (!user) {
          throw new Error('User is undefined')
        }

        const fileRef = ref(storage, `profilePics/${user.uid}/profilePicture.png`)

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
      deleteProfileImage: handleDeleteProfileImage,
      loadProfileImage: handleLoadProfileImage,
      updateProfileImage: handleUpdateProfileImage,
    }
    return obj
  }, [
    error,
    userPhoto,
    isLoading,
    handleLoadProfileImage,
    handleUpdateProfileImage,
    handleDeleteProfileImage,
  ])

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}
