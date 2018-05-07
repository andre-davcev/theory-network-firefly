export enum ActionsPlaces
{
    PlacesInitialize   = '[Places] Places Initialize',
    AutocompleteBind   = '[Places] Autocomplete Bind',
    AutocompleteUnbind = '[Places] Autocomplete Unbind',
}

export class PlacesInitialize
{
    static readonly type = ActionsPlaces.PlacesInitialize;

    constructor() {}
}

export class AutocompleteBind
{
    static readonly type = ActionsPlaces.AutocompleteBind;

    constructor(public payload: HTMLInputElement) {}
}

export class AutocompleteUnbind
{
    static readonly type = ActionsPlaces.AutocompleteUnbind;

    constructor() {}
}
