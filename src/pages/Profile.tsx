import { useState } from 'react'
import { auth } from '../firebaseConfig'
import { FaCheck } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useAtomValue, useSetAtom } from 'jotai'
import { loadingAtom, userAtom } from '../store/authStore'
import { deleteUser, signOut, updatePassword } from 'firebase/auth'

export const Profile = () => {
  const [error, setError] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState('')

  const setLoading = useSetAtom(loadingAtom)

  const user = useAtomValue(userAtom)

  const navigate = useNavigate()

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submit button clicked')
    try {
      await updatePassword(user, newPassword)

      alert('Password changed successfully!')
      setNewPassword('')
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        // console.error('ffff', error)
        // setError('You need to log in again before changing your password.')
        navigate('/login', { state: { reauthenticate: true } })
      } else {
        console.error('Failed change password', error)
        setError(error.message)
      }
    }
  }

  const handleLogoutClick = async () => {
    try {
      await signOut(auth)

      alert('User logged out successfully!')
      navigate('/login')
    } catch (error) {
      setError('Failed to log out')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = async () => {
    try {
      await deleteUser(user)

      alert('User deleted successfully!')
      navigate('/login')
    } catch (error) {
      setError('Failed to delete user')
    }
  }

  return (
    <div className="bg-green-200 flex flex-col space-y-4 items-center">
      <p>Hi, {user?.email}!</p>
      <form onSubmit={handleNewPasswordSubmit} className="bg-yellow-200">
        <label
          htmlFor="newPassword"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Change password
        </label>
        <div className="flex space-x-2">
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="shadow-md px-3 font-medium text-white bg-green-600 rounded-md"
          >
            <FaCheck />
          </button>
        </div>
      </form>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        onClick={handleLogoutClick}
        className="shadow-md px-3 py-1 font-medium text-white bg-indigo-600 rounded-md"
      >
        Logout
      </button>
      <button
        onClick={handleDeleteClick}
        className="shadow-md px-3 py-1 font-medium text-white bg-red-600 rounded-md"
      >
        Delete account
      </button>
    </div>
  )
}
