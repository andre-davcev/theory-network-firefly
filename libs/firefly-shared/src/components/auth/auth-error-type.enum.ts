export enum AuthErrorType {
  Required = 'required',
  MinLength = 'minlength',
  MaxLength = 'maxlength',
  Pattern = 'pattern',

  AuthInvalidEmail = 'auth/invalid-email',
  AuthUserDisabled = 'auth/user-disabled',
  AuthUserNotFound = 'auth/user-not-found',
  AuthEmailAlreadyInUse = 'auth/email-already-in-use',
  AuthWrongPassword = 'auth/wrong-password',
  AuthWeakPassword = 'auth/weak-password',
  AuthTooManyRequests = 'auth/too-many-requests'
}
