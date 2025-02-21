import { useState } from 'react'
import { Link, Navigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Routes } from '../router/config'
import { Button, FormInput } from '../uikit'
import { useAuthContext } from '../contexts/AuthContext/hook'

type Props = {
  isSignup: boolean
}

export const AuthForm = ({ isSignup }: Props) => {
  const { t } = useTranslation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { user, loading, error, setError, signup, login } = useAuthContext()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSignup && confirmPassword !== password) {
      setError(t('auth.signup.passwordsNotEqual'))
      return
    }

    const authAction = isSignup ? signup : login
    await authAction({ email, password })
  }

  const handleInputFocus = () => {
    setError('')
  }

  if (loading) return <div>{t('global.loading')}</div>

  if (user) {
    return <Navigate to={Routes.PROFILE_PAGE_URL} />
  }

  return (
    <div className="bg-white shadow-md rounded flex flex-col w-5/6 sm:w-1/3 border border-inherit">
      <h2 className="text-2xl font-semibold mt-6 self-center">
        {isSignup ? t('auth.signup.title') : t('auth.login.title')}
      </h2>
      <form onSubmit={handleFormSubmit} className="space-y-4 p-8">
        <FormInput
          label={t('auth.form.email')}
          htmlFor="email"
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={handleInputFocus}
          required
        />
        <FormInput
          label={t('auth.form.password')}
          htmlFor="password"
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={handleInputFocus}
          required
        />
        {isSignup && (
          <FormInput
            label={t('auth.form.confirmPassword')}
            htmlFor="confirmPassword"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            onFocus={handleInputFocus}
            required
          />
        )}
        <div className="flex items-center h-6">
          {error && <div className="text-red-500 text-sm leading-tight">{error}</div>}
        </div>
        <Button
          type="submit"
          variant="success"
          label={isSignup ? t('auth.signup.button') : t('auth.login.button')}
          size="large"
        />
      </form>
      {isSignup ? (
        <p className="text-sm text-center mb-6">
          {t('auth.form.linkToLogin')}{' '}
          <Link to={Routes.LOGIN_PAGE_URL}>{t('auth.login.title')}</Link>
        </p>
      ) : (
        <p className="text-sm text-center mb-6">
          {t('auth.form.linkToSignup')}{' '}
          <Link to={Routes.SIGNUP_PAGE_URL}>{t('auth.signup.title')}</Link>
        </p>
      )}
    </div>
  )
}
