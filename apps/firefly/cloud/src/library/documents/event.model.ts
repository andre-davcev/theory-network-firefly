import { firestore } from 'firebase/app';

import { FirebaseDocument } from '../interfaces';
import { Location } from '../models';
import { MetadataEvent } from '../models/event.metadata';

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
    timeNotify     : string;
    timeStart      : string;
    timeEnd        : string;
    phone?         : string;
    virtual        : boolean;
    website?       : string;

    metadata: MetadataEvent;
}
