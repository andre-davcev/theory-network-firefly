import { User } from '@firefly/core/models';

export interface StateUserModel
{
    authData       : firebase.User;
    user           : User;
    error          : Error;
    authenticated  : boolean;
    authenticating : boolean;
    initializing   : boolean;
}
