import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { Link, Navigate } from 'react-router-dom'
import { loadingAtom, userAtom } from '../store/authStore'

type AuthFormProps = {
  formPlaceholder: string
  onSubmit: (email: string, password: string, confirmPassword?: string) => void
  buttonText: string
  isSignup: boolean
  error: string | null
}
export const AuthForm = ({
  formPlaceholder,
  onSubmit,
  buttonText,
  isSignup,
  error,
}: AuthFormProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const loading = useAtomValue(loadingAtom)

  const user = useAtomValue(userAtom)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password, confirmPassword)
  }

  if (loading) return <div>Loading...</div>

  if (user) {
    return <Navigate to="/profile" />
  }

  return (
    <div className="bg-white shadow-md rounded flex flex-col w-5/6 sm:w-1/3 border border-inherit">
      <h2 className="text-2xl font-semibold mt-6 self-center">
        {formPlaceholder}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-8">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {isSignup && (
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {buttonText}
          </button>
        </div>
      </form>
      {isSignup ? (
        <p className="text-sm text-center mb-6">
          Already have an account? <Link to={'/login'}>Log in</Link>
        </p>
      ) : (
        <p className="text-sm text-center mb-6">
          No account yet? <Link to={'/signup'}>Sign up</Link>
        </p>
      )}
    </div>
  )
}