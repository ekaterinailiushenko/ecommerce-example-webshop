export const getFirebaseErrorMessage = (authCode: string) => {
  switch (authCode) {
    case 'auth/invalid-password':
      return 'firebaseError.invalidPassword'

    case 'auth/invalid-email':
      return 'firebaseError.invalidEmail'

    case 'auth/requires-recent-login':
      return 'firebaseError.recentLoginRequired'

    case 'auth/invalid-credential':
      return 'firebaseError.invalidCredential'

    case 'auth/email-already-in-use':
      return 'firebaseError.userAlreadyExist'

    case 'auth/too-many-requests':
      return 'firebaseError.tooManyRequests'

    case 'auth/weak-password':
      return 'firebaseError.weakPassword'

    case 'storage/object-not-found':
      return 'firebaseError.objectNotFound'

    default:
      return 'firebaseError.unknownError'
  }
}
