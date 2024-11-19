import { createContext } from 'react'
import type { User } from 'firebase/auth'

export namespace ProfileContext {
  export interface Value {
    loading: boolean
    userPhoto: string
    deleteProfileImage: (user: User) => Promise<void>
    loadProfileImage: (user: User) => Promise<void>
    updateProfileImage: (args: { file: File; user: User }) => Promise<void>

    error?: string
  }
}

export const ProfileContext = createContext<ProfileContext.Value | null>(null)
