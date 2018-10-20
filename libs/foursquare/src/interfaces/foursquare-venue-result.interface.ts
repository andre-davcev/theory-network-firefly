import { FoursquareVenueLocationResult } from './foursquare-venue-location-result.interface';

export interface FoursquareVenueResult
{
    id       : string;
    name     : string;
    location : FoursquareVenueLocationResult;
}
