import { StateDocumentModel } from '@theory/ngxs';
import { InterestType, EventType } from '@firefly/core/enums';

export interface StateUserModel extends StateDocumentModel
{
    authData        : firebase.User;
    error           : Error;
    authenticating  : boolean;
    initialized     : boolean;
    interestType    : InterestType;
    interestVirtual : boolean;
    eventType       : EventType;
    eventVirtual    : boolean;
}
