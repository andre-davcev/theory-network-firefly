import { FoursquareResponseStatus } from '.';
import { FoursquareVenueResult, FoursquareCategory } from '../interfaces';

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
