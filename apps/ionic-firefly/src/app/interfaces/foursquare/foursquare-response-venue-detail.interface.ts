import { FoursquareResponseStatus } from './foursquare-response-status.interface';
import { FoursquareVenue } from './foursquare-venue.interface';

export interface FoursquareResponseVenueDetail
{
    meta : FoursquareResponseStatus;

    response :
    {
        venue: FoursquareVenue;
    }
}
