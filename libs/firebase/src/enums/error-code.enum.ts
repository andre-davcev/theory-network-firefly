export enum ErrorCode {
  AuthInvalidEmail = 'auth/invalid-email', // createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail
  AuthUserDisabled = 'auth/user-disabled', // signInWithEmailAndPassword
  AuthUserNotFound = 'auth/user-not-found', // signInWithEmailAndPassword, sendPasswordResetEmail
  AuthWrongPassword = 'auth/wrong-password', // signInWithEmailAndPassword
  AuthEmailAlreadyInUse = 'auth/email-already-in-use', // createUserWithEmailAndPassword
  AuthOperationNotAllowed = 'auth/operation-not-allowed', // createUserWithEmailAndPassword, signInAnonymously
  AuthWeakPassword = 'auth/weak-password', // createUserWithEmailAndPassword,
  AuthMissingAndroidPkgName = 'auth/missing-android-pkg-name', // sendPasswordResetEmail
  AuthMissingContinueUri = 'auth/missing-continue-uri', // sendPasswordResetEmail
  AuthMissingIosBundleId = 'auth/missing-ios-bundle-id', // sendPasswordResetEmail
  AuthInvalidContinueUri = 'auth/invalid-continue-uri', // sendPasswordResetEmail
  AuthUnauthorizedContinueUri = 'auth/unauthorized-continue-uri' // sendPasswordResetEmail
}
