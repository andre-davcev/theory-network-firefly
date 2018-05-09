export enum ActionsPlaces
{
    PlacesInitialize = '[Places] Places Initialize',

    PlacesAutocompleteBind   = '[Places] Places Autocomplete Bind',
    PlacesAutocompleteUnbind = '[Places] Places Autocomplete Unbind',

    PlaceSearch         = '[Places] Place Search',
    PlaceSearchExtended = '[Places] Place Search Extended'
}

export class PlacesInitialize
{
    static readonly type = ActionsPlaces.PlacesInitialize;

    constructor() {}
}

export class PlacesAutocompleteBind
{
    static readonly type = ActionsPlaces.PlacesAutocompleteBind;

    constructor(public payload: HTMLInputElement) {}
}

export class PlacesAutocompleteUnbind
{
    static readonly type = ActionsPlaces.PlacesAutocompleteUnbind;

    constructor() {}
}

export class PlaceSearch
{
    static readonly type = ActionsPlaces.PlaceSearch;

    constructor(public payload: string) {}
}

export class PlaceSearchExtended
{
    static readonly type = ActionsPlaces.PlaceSearch;

    constructor(public payload: string) {}
}
