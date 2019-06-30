import { MapboxPlaceType } from '@theory/mapbox';
import { firestore } from 'firebase/app';

export interface Location
{
    types : Array<MapboxPlaceType>;
}
