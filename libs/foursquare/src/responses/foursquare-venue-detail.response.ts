import { FoursquareResponseStatus } from '.';
import { FoursquareVenue } from '../interfaces';

export interface FoursquareResponseVenueDetail
{
    meta : FoursquareResponseStatus;

    response :
    {
        venue: FoursquareVenue;
    }
}
