import { FoursquarePageInfo } from './foursquare-page-info.interface';
import { FoursquareUser } from './foursquare-user.interface';

export interface FoursquarePage
{
    pageInfo : FoursquarePageInfo;
    user     : FoursquareUser;
}
