import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import en from '../i18n/en.json'
import { Button } from '../uikit'
import { Routes } from '../router/config'
import { FormInput } from '../uikit/FormInput'
import { useAuthContext } from '../contexts/AuthContext/hook'

type AuthFormProps = {
  formPlaceholder: string
  onSubmit: ({
    email,
    password,
    confirmPassword,
  }: {
    email: string
    password: string
    confirmPassword: string
  }) => void
  buttonText: string
  isSignup: boolean
  onInputFocus: () => void
}
export const AuthForm = ({
  formPlaceholder,
  onSubmit,
  buttonText,
  isSignup,
  onInputFocus,
}: AuthFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { user, loading, error } = useAuthContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, password, confirmPassword })
  }

  if (loading) return <div>{en.global.loading}</div>

  if (user) {
    return <Navigate to={Routes.PROFILE_PAGE_URL} />
  }

  return (
    <div className="bg-white shadow-md rounded flex flex-col w-5/6 sm:w-1/3 border border-inherit">
      <h2 className="text-2xl font-semibold mt-6 self-center">{formPlaceholder}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-8">
        <FormInput
          label={en.auth.form.email}
          htmlFor="email"
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={onInputFocus}
          required
        />
        <FormInput
          label={en.auth.form.password}
          htmlFor="password"
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={onInputFocus}
          required
        />
        {isSignup && (
          <FormInput
            label={en.auth.form.confirmPassword}
            htmlFor="confirmPassword"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            onFocus={onInputFocus}
            required
          />
        )}
        <div className="flex items-center h-6">
          {error && <div className="text-red-500 text-sm leading-tight">{error}</div>}
        </div>
        <Button type="submit" variant="secondary" label={buttonText} size="large" />
      </form>
      {isSignup ? (
        <p className="text-sm text-center mb-6">
          {en.auth.form.linkToLogin} <Link to={Routes.LOGIN_PAGE_URL}>{en.auth.login.title}</Link>
        </p>
      ) : (
        <p className="text-sm text-center mb-6">
          {en.auth.form.linkToSignup}{' '}
          <Link to={Routes.SIGNUP_PAGE_URL}>{en.auth.signup.title}</Link>
        </p>
      )}
    </div>
  )
}
