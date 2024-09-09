import { AuthForm } from '../components/AuthForm'
import { useAuthStore } from '../store/useAuthStore'

export const LogIn = () => {
  const { login, setError } = useAuthStore(state => ({
    login: state.login,
    setError: state.setError,
  }))

  const handleLoginSubmit = async (email: string, password: string) => {
    await login(email, password)
  }

  const handleInputFocus = () => {
    setError('')
  }

  return (
    <div className="flex h-[calc(100vh-64px)] justify-center items-center">
      <AuthForm
        formPlaceholder="Log In"
        onSubmit={handleLoginSubmit}
        buttonText="Log In"
        isSignup={false}
        onInputFocus={handleInputFocus}
      />
    </div>
  )
}
