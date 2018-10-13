import { FoursquareVenueLocationResult } from '.';

export interface FoursquareVenueResult
{
    id       : string;
    name     : string;
    location : FoursquareVenueLocationResult;
}
