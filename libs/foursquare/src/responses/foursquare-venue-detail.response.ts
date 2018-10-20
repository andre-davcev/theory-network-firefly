import { FoursquareResponseStatus } from './foursquare-response-status.interface';
import { FoursquareVenue } from '../interfaces';

export interface FoursquareResponseVenueDetail
{
    meta : FoursquareResponseStatus;

    response :
    {
        venue: FoursquareVenue;
    }
}
