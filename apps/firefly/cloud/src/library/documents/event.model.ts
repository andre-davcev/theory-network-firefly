import { GeoPoint, Timestamp } from '../types';

import { FirebaseDocument, CityInfo } from '../interfaces';
import { MetadataEvent } from '../metadata';
import { MapboxPlaceType } from '../enums';

export interface Event extends FirebaseDocument
{
    city           : CityInfo;
    description    : string;
    draft          : boolean;
    geopoint       : GeoPoint;
    interests      : Array<string>;
    name           : string;
    notifyComplete : boolean;
    placeType      : MapboxPlaceType;
    private        : boolean;
    tagline        : string;
    timeNotify     : Timestamp;
    timeStart      : Timestamp;
    timeEnd        : Timestamp;
    phone?         : string;
    virtual        : boolean;
    website?       : string;

    metadata: MetadataEvent;
}
