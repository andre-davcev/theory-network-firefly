import { FoursquareTimeframe } from '.';

export interface FoursquareHours
{
    status         : string;
    isOpen         : boolean;
    isLocalHoliday : boolean;
    timeframes     : Array<FoursquareTimeframe>;
}
