import { firestore } from 'firebase/app';

import { FirebaseDocument } from '../interfaces';
import { Location } from '../models';
import { MetadataEvent } from '../models/event.metadata';

export interface Event extends FirebaseDocument
{
    bucketPath     : string;
    cityId         : string;
    city           : Location;
    clusters       : Array<string>;
    description    : string;
    geopoint       : firestore.GeoPoint;
    name           : string;
    notifyComplete : boolean;
    private        : boolean;
    tagline        : string;
    timeNotify     : string;
    timeStart      : string;
    timeEnd        : string;

    metadata?: MetadataEvent;
}
