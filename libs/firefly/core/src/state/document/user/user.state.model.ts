import { StateDocumentModel } from '@theory/ngxs';
import { Subscription } from '@firefly/cloud';

export interface StateUserModel extends StateDocumentModel
{
    authData         : firebase.User;
    error            : Error;
    authenticated    : boolean;
    authenticating   : boolean;
    initializing     : boolean;
    cityId           : string;
    subscriptionsStatus    : Record<string, Subscription>;
}
