export interface Timeframe
{
    days          : string;
    includesToday : boolean;
    open          : Array<{renderedTime: string;}>;
    segments      : Array<any>;
}
