import { ActionsPlaces } from './places.actions.enum';

export class ActionPlaceSearch
{
    static readonly type = ActionsPlaces.PlaceSearch;

    constructor(public payload: string) {}
}

export class ActionPlaceDetails
{
    static readonly type = ActionsPlaces.PlaceDetails;

    constructor(public payload: string) {}
}
