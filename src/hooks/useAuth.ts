// src/hooks/useAuth.ts
import { useAtom } from 'jotai'
import { auth } from '../firebaseConfig'
import { loadingAtom, userAtom } from '../store/authStore'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { useEffect } from 'react'

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom)
  const [loading, setLoading] = useAtom(loadingAtom)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setUser, setLoading])

  const register = async (email: string, password: string) => {
    setLoading(true)
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    setUser(userCredential.user)
    setLoading(false)
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    setUser(userCredential.user)
    setLoading(false)
  }

  const logout = async () => {
    setLoading(true)
    await signOut(auth)
    setLoading(false)
  }

  return {
    user,
    loading,
    register,
    login,
    logout,
  }
}
