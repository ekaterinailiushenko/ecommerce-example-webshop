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

import { AuthContext } from './context'
import { auth } from '../../firebaseConfig'
import { getFirebaseErrorMessage, logger } from '../../utilities'

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | null>()
  const [error, setError] = useState<string | null>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSetError = useCallback((updatedError: string) => {
    setError(updatedError)
  }, [])

  const handleLogin = useCallback(async (email: string, password: string) => {
    setError(null)
    setIsLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      if (error instanceof FirebaseError) {
        logger.error('Failed to log in', error.message)
        setError(getFirebaseErrorMessage(error.code))
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSignup = useCallback(async (email: string, password: string) => {
    setError(null)
    setIsLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      if (error instanceof FirebaseError) {
        logger.error('Failed to sign up', error.message)
        setError(getFirebaseErrorMessage(error.code))
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleLogout = useCallback(async () => {
    setError(null)
    setIsLoading(true)

    try {
      await signOut(auth)
    } catch (error) {
      if (error instanceof FirebaseError) {
        logger.error('Failed to log out', error.message)
        setError(getFirebaseErrorMessage(error.code))
      }
    } finally {
      setIsLoading(false)
      setUser(null)
    }
  }, [])

  const handleChangePassword = useCallback(
    async (user: User, newPassword: string) => {
      setIsLoading(true)
      setError(null)

      try {
        await updatePassword(user, newPassword)
      } catch (error) {
        if (error instanceof FirebaseError) {
          logger.error('Failed to change password', error.message)
          setError(getFirebaseErrorMessage(error.code))
        }
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const handleDeleteUser = useCallback(async (user: User) => {
    setError(null)
    setIsLoading(true)

    try {
      await deleteUser(user)
    } catch (error) {
      if (error instanceof FirebaseError) {
        logger.error('Failed to delete user', error.message)
        setError(getFirebaseErrorMessage(error.code))
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
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
