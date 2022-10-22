export enum AuthErrorPassword
{
    Required            = 'required',
    MinLength           = 'minlength',
    MaxLength           = 'maxlength',
    Pattern             = 'pattern',
    AuthWrongPassword   = 'auth/wrong-password',
    AuthWeakPassword    = 'auth/weak-password',
    AuthTooManyRequests = 'auth/too-many-requests'
}
