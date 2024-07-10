// import { create } from 'zustand'
// import { auth } from '../firebase'
// import { UserCredential, createUserWithEmailAndPassword } from 'firebase/auth'

// type useAuthStore = {
//   isLoading: boolean
//   isError: boolean
//   signUp: (email: string, password: string) => Promise<UserCredential>
// }

// export const useAuthStore = create<useAuthStore>(() => ({
//   isLoading: false,
//   isError: false,
//   signUp: async (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password)
//   },
// }))
