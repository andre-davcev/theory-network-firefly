import { Position } from '@capacitor/geolocation';

export interface StateLocationModel
{
    location : Position;
    error    : Error;
}
