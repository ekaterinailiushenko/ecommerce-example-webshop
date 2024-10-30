import { createContext } from 'react'
import type { User } from 'firebase/auth'

export namespace AuthContext {
  export interface Value {
    setError: (updatedError: string) => void
    login: (email: string, password: string) => Promise<void>
    signup: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    changePassword: (user: User, newPassword: string) => Promise<void>
    deleteUser: (user: User) => Promise<void>

    user?: User
    error?: string
    loading: boolean
  }
}

export const AuthContext = createContext<AuthContext.Value | null>(null)
