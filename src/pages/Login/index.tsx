import en from '../../i18n/en.json'
import { AuthForm } from '../../uikit'
import { useAuthContext } from '../../contexts/AuthContext/hook'

export const LogIn = () => {
  const { login, setError } = useAuthContext()

  const handleLoginSubmit = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    await login({ email, password })
  }

  const handleInputFocus = () => {
    setError('')
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <AuthForm
        formPlaceholder={en.auth.login.title}
        onSubmit={handleLoginSubmit}
        buttonText={en.auth.login.button}
        isSignup={false}
        onInputFocus={handleInputFocus}
      />
    </div>
  )
}
