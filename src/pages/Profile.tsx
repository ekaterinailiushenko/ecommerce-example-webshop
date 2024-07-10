import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

export const Profile = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const { logout } = useAuth()

  const handleClick = async () => {
    try {
      await logout()

      alert('User logged out successfully!')
      navigate('/')
    } catch (error) {
      setError('Failed to log out')
    }
  }

  return (
    <div>
      <p>Profile</p>
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}
