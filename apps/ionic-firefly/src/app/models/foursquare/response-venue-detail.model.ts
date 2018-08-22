import { ResponseStatus } from './api-status.model';
import { Venue } from './venue.model';

export interface ResponseVenueDetail
{
    meta : ResponseStatus;

    response :
    {
        venue: Venue;
    }
}
