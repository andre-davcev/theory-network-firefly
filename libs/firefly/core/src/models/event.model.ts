import { firestore } from 'firebase/app';

import { Asset } from './asset.model';
import { MapboxPlaceType } from '@theory/mapbox';

export interface Event extends Asset
{
    tagline       : string;
    coordinates   : firestore.GeoPoint;
    locationTypes : Array<MapboxPlaceType>;
    timeStart     : string;
    timeEnd       : string;
}
