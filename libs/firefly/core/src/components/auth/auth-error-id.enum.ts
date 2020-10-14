export enum AuthErrorId
{
    Required              = 'required',
    MinLength             = 'minlength',
    MaxLength             = 'maxlength',
    Pattern               = 'pattern',
    AuthInvalidEmail      = 'auth/invalid-email',
    AuthUserDisabled      = 'auth/user-disabled',
    AuthUserNotFound      = 'auth/user-not-found',
    AuthEmailAlreadyInUse = 'auth/email-already-in-use'
}
