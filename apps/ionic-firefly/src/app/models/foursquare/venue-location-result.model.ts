import { VenueLocation } from './venue-location.model';

export interface VenueLocationResult extends VenueLocation
{
    distance       : number;
    labeledLatLngs : Array<{label: string; lat: number; lng: number}>;
}
