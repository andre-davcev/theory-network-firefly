import { firestore } from 'firebase/app';

import { FirebaseDocument } from '../interfaces';
import { Location } from '../models';
import { MetadataEvent } from '../models/event.metadata';

export interface Event extends FirebaseDocument
{
    name        : string;
    tagline     : string;
    description : string;
    bucketPath  : string;
    private     : boolean;

    geopoint : firestore.GeoPoint;
    city     : Location;

    timeStart  : string;
    timeEnd    : string;
    timeNotify : string;

    notifyComplete : boolean;
    clusters       : Array<string>;

    metadata?: MetadataEvent;
}
