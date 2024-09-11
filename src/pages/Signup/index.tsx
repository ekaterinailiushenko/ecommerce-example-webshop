import { AuthForm } from '../../uikit'
import { useAuthStore } from '../../stores'

export const SignUp = () => {
  const { signup, setError } = useAuthStore(state => ({
    signup: state.signup,
    setError: state.setError,
  }))

  const handleSignupSubmit = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (confirmPassword !== password) {
      setError('Passwords do not match')
      return
    }

    await signup(email, password)
  }

  const handleInputFocus = () => {
    setError('')
  }

  return (
    <div className="flex h-[calc(100vh-64px)] justify-center items-center">
      <AuthForm
        formPlaceholder="Sign Up"
        onSubmit={handleSignupSubmit}
        buttonText="Sign Up"
        isSignup={true}
        onInputFocus={handleInputFocus}
      />
    </div>
  )
}
