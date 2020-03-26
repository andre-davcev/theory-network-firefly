import { StateDocumentModel } from '@theory/ngxs';
import { InterestType } from '@firefly/core/enums';

export interface StateUserModel extends StateDocumentModel
{
    authData       : firebase.User;
    error          : Error;
    authenticated  : boolean;
    authenticating : boolean;
    initialized    : boolean;
    interestType   : InterestType;
}
