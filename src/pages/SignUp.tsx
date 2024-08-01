import { useState } from 'react'
import { useSetAtom } from 'jotai'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { loadingAtom } from '../store/authStore'
import { AuthForm } from '../components/AuthForm'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const SignUp = () => {
  const [error, setError] = useState<string | null>(null)

  const setLoading = useSetAtom(loadingAtom)

  const navigate = useNavigate()

  const handleSignupSubmit = async (
    email: string,
    password: string,
    confirmPassword?: string
  ) => {
    if (confirmPassword !== password) {
      return setError('Passwords do not match')
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)

      alert('User created successfully!')
      navigate('/login')
    } catch (error) {
      setError(error.message)
      console.error('Failed to register:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthForm
      formPlaceholder="Sign Up"
      onSubmit={handleSignupSubmit}
      buttonText="Sign Up"
      isSignup={true}
      error={error}
    />
  )
}
