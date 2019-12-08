import { firestore } from 'firebase/app';

import { FirebaseDocument } from '@theory/firebase';

export interface Event extends FirebaseDocument
{
    name        : string;
    tagline     : string;
    description : string;
    bucketPath  : string;
    private     : boolean;

    geopoint : firestore.GeoPoint;
    location : Location;
    city     : Location;

    timeStart : string;
    timeEnd   : string;

    clusters : Array<string>;

    notifyCompleted : boolean;
    notifyImmediate : boolean;
    notifyDateTime  : firestore.Timestamp;
}
