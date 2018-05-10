import { Timeframe } from './timeframe.model';

export interface Hours
{
    status         : string;
    isOpen         : boolean;
    isLocalHoliday : boolean;
    timeframes     : Array<Timeframe>;
}
