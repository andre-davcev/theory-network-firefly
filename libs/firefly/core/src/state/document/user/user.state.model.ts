import { User } from '@firefly/core/models';
import { StateAssetModel } from '@firefly/core/interfaces';

export interface StateUserModel extends StateAssetModel<User>
{
    authData         : firebase.User;
    error            : Error;
    authenticated    : boolean;
    authenticating   : boolean;
    initializing     : boolean;
}
