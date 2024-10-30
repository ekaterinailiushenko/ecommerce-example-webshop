import { createContext } from 'react'
import type { User } from 'firebase/auth'

export namespace AuthContext {
  export interface Value {
    loading: boolean
    setError: (updatedError: string) => void
    login: (args: { email: string; password: string }) => Promise<void>
    signup: (args: { email: string; password: string }) => Promise<void>
    logout: () => Promise<void>
    changePassword: (args: { user: User; newPassword: string }) => Promise<void>
    deleteUser: (user: User) => Promise<void>

    user?: User
    error?: string
  }
}

export const AuthContext = createContext<AuthContext.Value | null>(null)
