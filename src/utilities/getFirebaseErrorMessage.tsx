import en from '../i18n/en.json'

export const getFirebaseErrorMessage = (authCode: string) => {
  switch (authCode) {
    case 'auth/invalid-password':
      return en.firebaseError.invalidPassword

    case 'auth/invalid-email':
      return en.firebaseError.invalidEmail

    case 'auth/requires-recent-login':
      return en.firebaseError.recentLoginRequired

    case 'auth/invalid-credential':
      return en.firebaseError.invalidCredential

    case 'auth/email-already-in-use':
      return en.firebaseError.userAlreadyExist

    case 'auth/too-many-requests':
      return en.firebaseError.tooManyRequests

    case 'auth/weak-password':
      return en.firebaseError.weakPassword

    case 'storage/object-not-found':
      return en.firebaseError.objectNotFound

    default:
      return en.firebaseError.unknownError
  }
}
