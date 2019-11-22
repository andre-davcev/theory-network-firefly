import { firestore } from 'firebase/app';

import { Asset } from './asset.model';
import { Location } from './location.model';

export interface Event extends Asset
{
    tagline     : string;
    coordinates : firestore.GeoPoint;
    location    : Location;
    timeStart   : string;
    timeEnd     : string;
}
