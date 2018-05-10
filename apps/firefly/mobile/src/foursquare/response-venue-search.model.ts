import { ResponseStatus } from './api-status.model';
import { VenueResult } from './venue-result.model';
import { Category } from './category.model';

export interface ResponseVenueSearch
{
    meta : ResponseStatus;

    response :
    {
        venues     : Array<VenueResult>;
        categories : Array<Category>;

        venuePage:
        {
            id: string;
        }
    }
}
