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
import { useCallback, useEffect, useMemo, useState } from 'react'

import en from '../../i18n/en.json'
import { AuthContext } from './context'
import { auth } from '../../firebaseConfig'
import { Events, PubSub } from '../../utilities/pubSub'
import { getFirebaseErrorMessage, logger } from '../../utilities'

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleSetError = useCallback((updatedError: string) => {
    setError(updatedError)
  }, [])

  const handleLogin = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setError('')

      try {
        await signInWithEmailAndPassword(auth, email, password)
        PubSub.publish(Events.USER_LOGGED_IN)
      } catch (error) {
        logger.error('Failed to log in', JSON.stringify(error))

        const errorMessage =
          error instanceof FirebaseError
            ? getFirebaseErrorMessage(error.code)
            : en.auth.errors.login

        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const handleSignup = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setError('')

      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        logger.error('Failed to sign up', JSON.stringify(error))

        const errorMessage =
          error instanceof FirebaseError
            ? getFirebaseErrorMessage(error.code)
            : en.auth.errors.signup

        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const handleLogout = useCallback(async () => {
    setError('')

    try {
      await signOut(auth)
    } catch (error) {
      logger.error('Failed to log out', JSON.stringify(error))

      const errorMessage =
        error instanceof FirebaseError
          ? getFirebaseErrorMessage(error.code)
          : en.auth.errors.logout

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleChangePassword = useCallback(
    async ({ user, newPassword }: { user: User; newPassword: string }) => {
      setError('')

      try {
        await updatePassword(user, newPassword)
      } catch (error) {
        logger.error('Failed to change password', JSON.stringify(error))

        const errorMessage =
          error instanceof FirebaseError
            ? getFirebaseErrorMessage(error.code)
            : en.auth.errors.changePassword

        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const handleDeleteUser = useCallback(async (user: User) => {
    setError('')

    try {
      await deleteUser(user)
    } catch (error) {
      logger.error('Failed to delete user', JSON.stringify(error))

      const errorMessage =
        error instanceof FirebaseError
          ? getFirebaseErrorMessage(error.code)
          : en.auth.errors.deleteUser

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser || undefined)
      setIsLoading(false)
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
