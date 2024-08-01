// import { useSetAtom } from 'jotai'
// import { auth } from '../firebaseConfig'
// import { loadingAtom, userAtom } from '../store/authStore'
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
// } from 'firebase/auth'
// import { useEffect } from 'react'

// export const useAuth = () => {
  // const setUser = useSetAtom(userAtom)
  // const setLoading = useSetAtom(loadingAtom)

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, currentUser => {
  //     setUser(currentUser)
  //     setLoading(false)
  //   })

  //   return () => unsubscribe()
  // }, [setUser, setLoading])

  // const register = async (email: string, password: string) => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password)
  //   } catch (error) {
  //     console.error('Failed to register:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const login = async (email: string, password: string) => {
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password)
  //   } catch (error) {
  //     console.error('Failed to log in:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const logout = async () => {
  //   try {
  //     await signOut(auth)
  //   } catch (error) {
  //     console.error('Failed to log out:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // return {
    // register,
    // login,
    // logout,
  // }
// }
