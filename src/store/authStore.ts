import { atom, useSetAtom } from 'jotai'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from '../firebaseConfig'

export const userAtom = atom<User | null>(null)

export const loadingAtom = atom<boolean>(true)

export const useAuth = () => {
  const setUser = useSetAtom(userAtom)
  const setLoading = useSetAtom(loadingAtom)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setUser, setLoading])
}
