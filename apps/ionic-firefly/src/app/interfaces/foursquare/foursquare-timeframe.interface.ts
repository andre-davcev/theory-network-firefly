export interface FoursquareTimeframe
{
    days          : string;
    includesToday : boolean;
    open          : Array<{renderedTime: string;}>;
    segments      : Array<any>;
}
