import { create } from 'zustand'
import { storage } from '../firebaseConfig'
import { FirebaseError } from 'firebase/app'
import {
  deleteUser,
  updatePassword,
  updateProfile,
  type User,
} from 'firebase/auth'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'

import defaultAvatar from '../assets/defaultAvatar.png'
import { logger, getFirebaseErrorMessage } from '../utilities'

type State = {
  userPhoto: string
  error: string | null
  loading: boolean
}

type Action = {
  changePassword: (user: User, newPassword: string) => Promise<void>
  deleteUser: (user: User) => Promise<void>
  updateProfilePhoto: (file: File, currentUser: User) => void
  loadProfileImage: (currentUser: User) => Promise<void>
  deleteUserPhoto: (currentUser: User) => Promise<void>
}

export const useProfileStore = create<State & Action>(set => ({
  userPhoto: defaultAvatar,
  error: '',
  loading: false,

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
  loadProfileImage: async (user: User) => {
    set({ loading: true, error: null })
    try {
      const fileRef = ref(storage, 'profilePics/' + user?.uid + '.png')
      const photoURL = await getDownloadURL(fileRef)

      useProfileStore.setState({
        userPhoto: photoURL,
        loading: false,
      })
    } catch (error) {
      if (error instanceof FirebaseError) {
        logger.error(
          'Failed to load profile image from storage',
          getFirebaseErrorMessage(error.code)
        )
        set({ error: getFirebaseErrorMessage(error.code) })
      }
    } finally {
      set({ loading: false })
    }
  },
  updateProfilePhoto: async (file, currentUser) => {
    set({ loading: true, error: null })

    try {
      const fileRef = ref(storage, 'profilePics/' + currentUser.uid + '.png')

      await uploadBytes(fileRef, file)
      alert('Uploaded a  file!')

      const photoURL = await getDownloadURL(fileRef)

      await updateProfile(currentUser, { photoURL })
      alert('Profile photo updated successfully!')

      set({ userPhoto: photoURL })
    } catch (error) {
      if (error instanceof FirebaseError) {
        set({ error: getFirebaseErrorMessage(error.code) })
      }
    } finally {
      set({ loading: false })
    }
  },
  deleteUserPhoto: async currentUser => {
    set({ loading: true, error: null })

    try {
      const fileRef = ref(storage, 'profilePics/' + currentUser.uid + '.png')

      await deleteObject(fileRef)
      set({ userPhoto: defaultAvatar })
      alert('Profile photo deleted successfully!')
    } catch (error) {
      if (error instanceof FirebaseError) {
        set({ error: getFirebaseErrorMessage(error.code) })
      }
    } finally {
      set({ loading: false })
    }
  },
}))
