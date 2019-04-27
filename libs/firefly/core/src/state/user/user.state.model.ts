import { User } from '@firefly/core/models';
import { FormGroup } from '@angular/forms';

export interface StateUserModel
{
    authData       : firebase.User;
    user           : User;
    error          : Error;
    authenticated  : boolean;
    authenticating : boolean;
    initializing   : boolean;
    form           : FormGroup;
    empty          : User;
}
