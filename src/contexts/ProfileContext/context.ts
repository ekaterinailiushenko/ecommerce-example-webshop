import { createContext } from 'react'
import type { User } from 'firebase/auth'

export namespace ProfileContext {
  export interface Value {
    deleteUser: (user: User) => Promise<void>
    deleteUserPhoto: (user: User) => Promise<void>
    loadProfileImage: (user: User) => Promise<void>
    updateProfilePhoto: (file: File, user: User) => Promise<void>
    changePassword: (user: User, newPassword: string) => Promise<void>

    error?: string | null
    loading: boolean
    userPhoto: string
  }
}

export const ProfileContext = createContext<ProfileContext.Value | null>(null)
