export enum ActionsLocation
{
    LocationWatch  = '[Location] Location Watch'
}

export class ActionLocationWatch
{
    static readonly type = ActionsLocation.LocationWatch;

    constructor() {}
}
