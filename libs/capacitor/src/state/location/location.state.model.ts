import { GeolocationPosition } from '@capacitor/core';

export interface StateLocationModel
{
    location : GeolocationPosition;
    cityId   : string;
    error    : Error;
}
