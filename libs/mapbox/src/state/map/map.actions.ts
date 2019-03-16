import { ActionsMap } from './map.actions.enum';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

export class ActionMapLocationWatch
{
    static readonly type = ActionsMap.LocationWatch;

    constructor() {}
}

export class ActionMapSearchResultSet
{
    static readonly type = ActionsMap.SearchResultSet;

    constructor(public payload: Result) { }
}

export class ActionMapSearchResultSetWithPlace
{
    static readonly type = ActionsMap.SearchResultSetWithPlace;

    constructor() { }
}

export class ActionMapSearchResultClear
{
    static readonly type = ActionsMap.SearchResultClear;

    constructor() { }
}

export class ActionMapPlaceSet
{
    static readonly type = ActionsMap.PlaceSet;

    constructor(public payload: Result) { }
}

export class ActionMapPlaceSetWithSearchResult
{
    static readonly type = ActionsMap.PlaceSetWithSearchResult;

    constructor() { }
}

export class ActionMapPlaceClear
{
    static readonly type = ActionsMap.PlaceClear;

    constructor() { }
}
