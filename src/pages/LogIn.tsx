import { useState } from 'react'
import { useSetAtom } from 'jotai'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { loadingAtom } from '../store/authStore'
import { AuthForm } from '../components/AuthForm'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const LogIn = () => {
  const [error, setError] = useState<string | null>(null)

  const setLoading = useSetAtom(loadingAtom)

  const navigate = useNavigate()

  const handleLoginSubmit = async (email: string, password: string) => {
    console.log('log in clicked')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert('User logged in successfully!')
      navigate('/profile')
    } catch (error) {
      console.log('log in clicked error')
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid email or password')
      } else {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthForm
      formPlaceholder="Log In"
      onSubmit={handleLoginSubmit}
      buttonText="Log In"
      isSignup={false}
      error={error}
    />
  )
}
