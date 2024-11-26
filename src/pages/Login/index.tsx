import { AuthForm } from '../../components'

export const LogIn = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <AuthForm isSignup={false} />
    </div>
  )
}
