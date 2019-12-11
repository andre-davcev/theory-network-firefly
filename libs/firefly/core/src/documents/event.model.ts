import { firestore } from 'firebase/app';

import { FirebaseDocument } from '@theory/firebase';
import { Location } from '../models';

export interface Event extends FirebaseDocument
{
    name        : string;
    tagline     : string;
    description : string;
    bucketPath  : string;
    private     : boolean;

    geopoint : firestore.GeoPoint;
    city     : Location;

    timeStart          : string;
    timeEnd            : string;
    timeNotify         : string;
    timeNotifyComplete : boolean;

    clusters : Array<string>;
}
