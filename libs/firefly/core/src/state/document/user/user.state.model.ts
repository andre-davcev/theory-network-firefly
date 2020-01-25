import { StateDocumentModel } from '@theory/ngxs';

export interface StateUserModel extends StateDocumentModel
{
    authData                : firebase.User;
    error                   : Error;
    authenticated           : boolean;
    authenticating          : boolean;
    initialized             : boolean;
    subscriptionsUnfiltered : Record<string, string>;
}
