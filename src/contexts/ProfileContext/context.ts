import { createContext } from 'react'
import type { User } from 'firebase/auth'

export namespace ProfileContext {
  export interface Value {
    loading: boolean
    userPhoto: string
    error?: string | null
    deleteProfileImage: (user: User) => Promise<void>
    loadProfileImage: (user: User) => Promise<void>
    updateProfileImage: ({
      file,
      user,
    }: {
      file: File
      user: User
    }) => Promise<void>
  }
}

export const ProfileContext = createContext<ProfileContext.Value | null>(null)
