import { firestore } from 'firebase/app';

import { FirebaseDocument, CityInfo } from '../interfaces';
import { MetadataEvent } from '../metadata';
import { MapboxPlaceType } from '../enums';

export interface Event extends FirebaseDocument
{
    city           : CityInfo;
    description    : string;
    draft          : boolean;
    geopoint       : firestore.GeoPoint;
    interests      : Array<string>;
    name           : string;
    notifyComplete : boolean;
    placeType      : MapboxPlaceType;
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
