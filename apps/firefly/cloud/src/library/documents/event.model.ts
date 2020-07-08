import { firestore } from 'firebase/app';

import { FirebaseDocument } from '../interfaces';
import { Location } from '../models';
import { MetadataEvent } from '../metadata/event.metadata';

export interface Event extends FirebaseDocument
{
    cityId         : string;
    city           : Location;
    description    : string;
    draft          : boolean;
    geopoint       : firestore.GeoPoint;
    interests      : Array<string>;
    name           : string;
    notifyComplete : boolean;
    private        : boolean;
    tagline        : string;
    timeNotify     : firestore.Timestamp;
    timeStart      : firestore.Timestamp;
    timeEnd        : firestore.Timestamp;
    phone?         : string;
    virtual        : boolean;
    website?       : string;

    metadata: MetadataEvent;
}
