import { create } from 'zustand'
import { useEffect } from 'react'
import type { User } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from 'firebase/auth'

import { auth } from '../firebaseConfig'
import { logger, getFirebaseErrorMessage } from '../utilities'

type State = {
  user: User | null
  error: string | null
  loading: boolean
}

type Action = {
  setError: (updatedError: string) => void
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  changePassword: (user: User, newPassword: string) => Promise<void>
  deleteUser: (user: User) => Promise<void>
}

export const useAuthStore = create<State & Action>(set => ({
  user: null,
  error: '',
  loading: true,
  setError: updatedError => set({ error: updatedError }),
  login: async (email: string, password: string) => {
    set({ loading: true, error: null })

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      if (error instanceof FirebaseError) {
        logger.error('Failed to log in', error.message)
        set({ error: getFirebaseErrorMessage(error.code) })
      }
    } finally {
      set({ loading: false })
    }
  },
  signup: async (email: string, password: string) => {
    set({ loading: true, error: null })

    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      if (error instanceof FirebaseError) {
        logger.error('Failed to register', error.message)
        set({ error: getFirebaseErrorMessage(error.code) })
      }
    } finally {
      set({ loading: false })
    }
  },
  logout: async () => {
    set({ loading: true, error: null })

    try {
      await signOut(auth)
    } catch (error) {
      if (error instanceof FirebaseError) {
        logger.error('Failed to log out', error.message)
        set({ error: getFirebaseErrorMessage(error.code) })
      }
    } finally {
      set({ loading: false, user: null })
    }
  },
  changePassword: async (user: User, newPassword: string) => {
    set({ loading: true, error: null })

    try {
      await updatePassword(user, newPassword)
    } catch (error) {
      if (error instanceof FirebaseError) {
        logger.error('Failed to change password', error.message)
        set({ error: getFirebaseErrorMessage(error.code) })
      }
    } finally {
      set({ loading: false })
    }
  },
  deleteUser: async (user: User) => {
    set({ loading: true, error: null })

    try {
      await deleteUser(user)
    } catch (error) {
      if (error instanceof FirebaseError) {
        logger.error('Failed to delete user', error.message)
        set({ error: getFirebaseErrorMessage(error.code) })
      }
    } finally {
      set({ loading: false })
    }
  },
}))

export const useAuth = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      useAuthStore.setState({
        user: currentUser,
        loading: false,
      })
    })
    return unsubscribe
  }, [])
}
