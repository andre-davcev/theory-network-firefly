import { MapboxPlaceType } from '@theory/mapbox';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

export interface Location
{
    latitude  : number;
    longitude : number;
    types     : Array<MapboxPlaceType>;
    place?    : Result;
}
