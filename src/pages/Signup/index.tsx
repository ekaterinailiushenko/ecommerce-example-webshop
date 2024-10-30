import en from '../../i18n/en.json'
import { AuthForm } from '../../uikit'
import { useAuthContext } from '../../contexts/AuthContext/hook'

export const SignUp = () => {
  const { signup, setError } = useAuthContext()

  const handleSignupSubmit = async ({
    email,
    password,
    confirmPassword,
  }: {
    email: string
    password: string
    confirmPassword: string
  }) => {
    if (confirmPassword !== password) {
      setError(en.auth.signup.passwordsNotEqual)
      return
    }

    await signup({ email, password })
  }

  const handleInputFocus = () => {
    setError('')
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <AuthForm
        formPlaceholder={en.auth.signup.title}
        onSubmit={handleSignupSubmit}
        buttonText={en.auth.signup.button}
        isSignup={true}
        onInputFocus={handleInputFocus}
      />
    </div>
  )
}
