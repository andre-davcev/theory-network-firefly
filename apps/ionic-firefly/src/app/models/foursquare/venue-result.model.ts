import { VenueLocationResult } from './venue-location-result.model';

export interface VenueResult
{
    id       : string;
    name     : string;
    location : VenueLocationResult;
}
