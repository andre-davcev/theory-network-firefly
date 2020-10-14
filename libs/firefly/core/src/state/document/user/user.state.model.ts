import { StateDocumentModel } from '@theory/ngxs';
import { InterestType, EventType } from '@firefly/core/enums';
import { FirebaseError } from 'firebase/app';

export interface StateUserModel extends StateDocumentModel
{
    authData        : firebase.User;
    error           : Error;
    errorAuth       : FirebaseError;
    authenticating  : boolean;
    initialized     : boolean;
    interestType    : InterestType;
    interestVirtual : boolean;
    eventType       : EventType;
    eventVirtual    : boolean;
}
