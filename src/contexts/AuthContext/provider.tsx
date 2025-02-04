import {
  signOut,
  type User,
  deleteUser,
  updatePassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { AuthContext } from './context'
import { auth } from '../../firebaseConfig'
import { Events, PubSub } from '../../utilities/pubSub'
import { getFirebaseErrorMessage, logger } from '../../utilities'

export const AuthContextProvider = ({ children }: { children: Children }) => {
  const { t } = useTranslation()

  const [error, setError] = useState('')
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(false)

  const handleSetError = useCallback((updatedError: string) => {
    setError(updatedError)
  }, [])

  const handleLogin = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setError('')
      setIsLoading(true)

      try {
        await signInWithEmailAndPassword(auth, email, password)
        PubSub.publish(Events.USER_LOGGED_IN)
      } catch (error) {
        logger.error('Failed to log in', JSON.stringify(error))

        const errorMessage =
          error instanceof FirebaseError
            ? t(getFirebaseErrorMessage(error.code))
            : t('auth.errors.login')

        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [t]
  )

  const handleSignup = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setError('')
      setIsLoading(true)

      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        logger.error('Failed to sign up', JSON.stringify(error))

        const errorMessage =
          error instanceof FirebaseError
            ? t(getFirebaseErrorMessage(error.code))
            : t('auth.errors.signup')

        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [t]
  )

  const handleLogout = useCallback(async () => {
    setError('')
    setIsLoading(true)

    try {
      await signOut(auth)
    } catch (error) {
      logger.error('Failed to log out', JSON.stringify(error))

      const errorMessage =
        error instanceof FirebaseError
          ? t(getFirebaseErrorMessage(error.code))
          : t('auth.errors.logout')

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [t])

  const handleChangePassword = useCallback(
    async ({ user, newPassword }: { user: User; newPassword: string }) => {
      setError('')
      setIsLoading(true)

      try {
        await updatePassword(user, newPassword)
      } catch (error) {
        logger.error('Failed to change password', JSON.stringify(error))

        const errorMessage =
          error instanceof FirebaseError
            ? t(getFirebaseErrorMessage(error.code))
            : t('auth.errors.changePassword')

        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [t]
  )

  const handleDeleteUser = useCallback(
    async (user: User) => {
      setError('')
      setIsLoading(true)

      try {
        await deleteUser(user)
      } catch (error) {
        logger.error('Failed to delete user', JSON.stringify(error))

        const errorMessage =
          error instanceof FirebaseError
            ? t(getFirebaseErrorMessage(error.code))
            : t('auth.errors.deleteUser')

        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [t]
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser || undefined)
    })
    return unsubscribe
  }, [])

  const value = useMemo(() => {
    const obj: AuthContext.Value = {
      user,
      error,
      loading: isLoading,
      login: handleLogin,
      logout: handleLogout,
      signup: handleSignup,
      setError: handleSetError,
      deleteUser: handleDeleteUser,
      changePassword: handleChangePassword,
    }

    return obj
  }, [
    user,
    error,
    isLoading,
    handleLogin,
    handleLogout,
    handleSignup,
    handleSetError,
    handleDeleteUser,
    handleChangePassword,
  ])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
