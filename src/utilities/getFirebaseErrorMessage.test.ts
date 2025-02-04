import i18next from 'i18next'

import { getFirebaseErrorMessage } from './getFirebaseErrorMessage'

describe('getFirebaseErrorMessage', () => {
  test.each`
    authCode                        | errorKey
    ${'auth/invalid-password'}      | ${'invalidPassword'}
    ${'auth/invalid-email'}         | ${'invalidEmail'}
    ${'auth/requires-recent-login'} | ${'recentLoginRequired'}
    ${'auth/invalid-credential'}    | ${'invalidCredential'}
    ${'auth/email-already-in-use'}  | ${'userAlreadyExist'}
    ${'auth/too-many-requests'}     | ${'tooManyRequests'}
    ${'auth/weak-password'}         | ${'weakPassword'}
    ${'storage/object-not-found'}   | ${'objectNotFound'}
  `('should return the correct error message for $authCode', ({ authCode, errorKey }) => {
    expect(i18next.t(getFirebaseErrorMessage(authCode))).toBe(
      i18next.t(`firebaseError.${errorKey}`)
    )
  })

  it('should return the default error message for unknown error code', () => {
    const unknownErrorCode = 'auth/unknown-error-code'
    expect(i18next.t(getFirebaseErrorMessage(unknownErrorCode))).toBe(
      i18next.t('firebaseError.unknownError')
    )
  })
})
