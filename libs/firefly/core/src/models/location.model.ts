import { MapboxPlaceType } from '@theory/mapbox';

export interface Location
{
    latitude  : number;
    longitude : number;
    types     : Array<MapboxPlaceType>;
}
