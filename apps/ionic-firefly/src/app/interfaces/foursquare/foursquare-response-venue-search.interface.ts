import { FoursquareResponseStatus } from './foursquare-response-status.interface';
import { FoursquareVenueResult } from './foursquare-venue-result.interface';
import { FoursquareCategory } from './foursquare-category.interface';

export interface FoursquareResponseVenueSearch
{
    meta : FoursquareResponseStatus;

    response :
    {
        venues     : Array<FoursquareVenueResult>;
        categories : Array<FoursquareCategory>;

        venuePage:
        {
            id: string;
        }
    }
}
