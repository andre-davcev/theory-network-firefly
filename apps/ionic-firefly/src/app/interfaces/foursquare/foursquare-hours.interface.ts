import { FoursquareTimeframe } from './foursquare-timeframe.interface';

export interface FoursquareHours
{
    status         : string;
    isOpen         : boolean;
    isLocalHoliday : boolean;
    timeframes     : Array<FoursquareTimeframe>;
}
