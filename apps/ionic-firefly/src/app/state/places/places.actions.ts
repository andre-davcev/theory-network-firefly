export enum ActionsPlaces
{
    PlaceSearch = '[Places] Place Search',
    PlaceDetails = '[Places]'
}

export class PlaceSearch
{
    static readonly type = ActionsPlaces.PlaceSearch;

    constructor(public payload: string) {}
}

export class PlaceDetails
{
    static readonly type = ActionsPlaces.PlaceDetails;

    constructor(public payload: string) {}
}
