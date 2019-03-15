import { GeolocationPosition } from '@capacitor/core';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

export interface StateMapModel
{
    position     : GeolocationPosition;
    searchResult : Result;
    place        : Result;
}
