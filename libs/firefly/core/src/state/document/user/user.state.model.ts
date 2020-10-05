import { StateDocumentModel } from '@theory/ngxs';
import { InterestType, EventType } from '@firefly/core/enums';
import { CityInfo } from '@firefly/cloud';
import { firestore } from 'firebase/app';

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
    isAnonymous     : boolean;

    city      : CityInfo;
    cityIsNew : boolean;
    geopoint  : firestore.GeoPoint;
}
