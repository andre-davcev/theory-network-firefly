import { GeolocationPosition } from '@capacitor/core';

export interface StateLocationModel
{
    location : GeolocationPosition;
    error    : Error;
}
