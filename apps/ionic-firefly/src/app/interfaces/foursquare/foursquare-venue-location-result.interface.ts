import { FoursquareVenueLocation } from './foursquare-venue-location.interface';

export interface FoursquareVenueLocationResult extends FoursquareVenueLocation
{
    distance       : number;
    labeledLatLngs : Array<{label: string; lat: number; lng: number}>;
}
