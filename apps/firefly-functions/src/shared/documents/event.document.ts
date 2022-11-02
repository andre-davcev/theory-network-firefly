import { GeoPoint, Timestamp } from '@angular/fire/firestore';

import { FirebaseDocument, CityInfo } from '../../library/interfaces';
import { MetadataEvent } from '../../library/metadata';
import { MapboxPlaceType } from '../../library/enums';

export interface Event extends FirebaseDocument
{
    city           : CityInfo;
    description    : string;
    draft          : boolean;
    geopoint       : GeoPoint;
    interests      : Array<string>;
    interestsPending: Array<string>;
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
