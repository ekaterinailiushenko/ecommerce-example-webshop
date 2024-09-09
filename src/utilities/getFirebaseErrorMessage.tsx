export const getFirebaseErrorMessage = (authCode: string) => {
  switch (authCode) {
    case 'auth/invalid-password':
      return 'Password provided is not corrected'

    case 'auth/invalid-email':
      return 'Email provided is invalid'

    case 'auth/requires-recent-login':
      return 'You need to log in again before changing your password or deleting your account'

    case 'auth/invalid-credential':
      return 'Email or password provided is invalid'

    case 'auth/email-already-in-use':
      return 'The provided email is already in use by an existing user. Each user must have a unique email.'

    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'

    case 'auth/weak-password':
      return 'Password should be at least 6 characters'

    case 'storage/object-not-found':
      return 'No object exists at the desired reference.'

    default:
      return 'Something went wrong'
  }
}
