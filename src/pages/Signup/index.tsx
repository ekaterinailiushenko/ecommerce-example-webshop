import { AuthForm } from '../../components'

export const SignUp = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <AuthForm isSignup={true} />
    </div>
  )
}
