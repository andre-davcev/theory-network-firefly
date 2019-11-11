import { firestore } from 'firebase/app';

import { Asset } from './asset.model';
import { Location } from './location.model';
import { Time } from './time.model';

export interface Event extends Asset
{
    tagline     : string;
    imageId     : string;
    coordinates : firestore.GeoPoint;
    location    : Location;
    times       : Array<Time>;
    url         : string;

    imageUrl?      : string;
    imageUrlSmall? : string;
}
